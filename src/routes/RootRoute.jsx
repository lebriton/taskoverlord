import React, { useState } from "react";
import Shortcut, { ShortcutWrap } from "../components/atoms/Shortcut";
import TaskDetails from "../components/organisms/TaskDetails";
import {
  TableCellsIcon,
  ViewColumnsIcon,
  Bars3BottomRightIcon,
  FunnelIcon,
  CalendarDaysIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import Tabs, { Tab } from "../components/organisms/Tabs";
import { getRealTaskStatus } from "../utils";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/tauri";
import Badge, { BadgeList } from "../components/atoms/Badge";
import { Outlet } from "react-router-dom";
import Heading3 from "../components/molecules/Heading3";
import FlexLine from "../components/molecules/FlexLine";
import Button from "../components/atoms/Button";
import BottomBar from "../components/organisms/BottomBar";
import Checkbox from "../components/molecules/Checkbox";
import Terminal from "../components/organisms/Terminal";
import NewTask from "../components/organisms/NewTask";
import Toast from "../components/molecules/Toast";

export default function RootRoute() {
  const queryClient = useQueryClient();
  const tasksQuery = useSuspenseQuery({
    queryKey: ["tasks"],
    // TODO: handle errors
    queryFn: async () => await invoke("get_all_tasks"),
  });

  const [previousTask, setPreviousTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [nextTask, setNextTask] = useState(null);

  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showNewTask, setShowNewTask] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  const hideTaskDetails = () => {
    setShowTaskDetails(false);

    setPreviousTask(null);
    setSelectedTask(null);
    setNextTask(null);
  };

  const displayTaskDetails = (task) => {
    const tasks = tasksQuery.data;
    const currentIndex = tasks.indexOf(task);

    if (currentIndex === -1) {
      setPreviousTask(null);
      setNextTask(null);
    } else {
      setPreviousTask(currentIndex > 0 ? tasks[currentIndex - 1] : null);
      setNextTask(
        currentIndex < tasks.length - 1 ? tasks[currentIndex + 1] : null,
      );
    }

    setSelectedTask(task);
    setShowTaskDetails(true);
  };

  const toggleTaskDetailsVisibility = () => {
    if (showTaskDetails) {
      hideTaskDetails();
    } else {
      displayTaskDetails(null);
    }
  };

  const links = [
    { label: "Table View", url: "/", Icon: TableCellsIcon, shortcut: "t" },
    { label: "Kanban Board", url: "/", Icon: ViewColumnsIcon, shortcut: "k" },
    {
      label: "Gantt Diagram",
      url: "/",
      Icon: Bars3BottomRightIcon,
      shortcut: "g",
    },
    { label: "Calendar", url: "/", Icon: CalendarDaysIcon, shortcut: "c" },
  ];

  // const projectsQuery = useSuspenseQuery({
  //   queryKey: ["projects"],
  //   // TODO: handle errors
  //   queryFn: async () => await invoke("get_project_names"),
  // });
  // const projects = projectsQuery.data.map((project, idx) => ({
  //   text: project,
  //   shortcut: (idx + 1).toString(),
  // }));

  return (
    <>
      <Toast variant="warning">This is a test message.</Toast>

      <div className="flex h-screen w-screen flex-col divide-y overflow-hidden">
        <FlexLine
          className="z-20 gap-4 px-2"
          left={
            <div className="flex items-center gap-2">
              <Heading3
                className="!mb-0"
                title="Tasks"
                badgeText={tasksQuery.data.length}
              />

              <Button
                Icon={ArrowPathIcon}
                variant="no-outline"
                shortcutText="r"
                onClick={() =>
                  queryClient.invalidateQueries({ queryKey: ["tasks"] })
                }
              />

              <div className="grow" />

              <CountTasksByStatus tasks={tasksQuery.data} />

              <Button Icon={FunnelIcon} shortcutText="f">
                Filter
              </Button>
            </div>
          }
          center={
            <Tabs>
              {links.map((link, idx) => (
                <Tab
                  key={idx}
                  className="!py-2"
                  label={link.label}
                  onClick={() => link.url}
                  Icon={link.Icon}
                  shortcutText={link.shortcut}
                  isActive={link.label == "Table View"}
                />
              ))}
            </Tabs>
          }
          right={
            <div className="flex items-center justify-end gap-2">
              <ShortcutWrap Shortcut={<Shortcut text="p" />}>
                <Checkbox
                  className="text-sm"
                  label="Show task details"
                  checked={showTaskDetails}
                  onChange={toggleTaskDetailsVisibility}
                />
              </ShortcutWrap>

              <Button
                variant="green"
                Icon={PlusCircleIcon}
                shortcutText="a"
                isDisabled={showNewTask}
                onClick={() => setShowNewTask(true)}
              >
                New task
              </Button>
            </div>
          }
        />

        <div className="flex flex-1 grow divide-x overflow-clip">
          <div className="grow overflow-clip bg-neutral-50">
            <Outlet context={[tasksQuery, selectedTask, displayTaskDetails]} />
          </div>

          {showTaskDetails && (
            <div className="min-w-96 max-w-96 overflow-clip">
              <TaskDetails
                task={selectedTask}
                onClose={hideTaskDetails}
                onPreviousTaskClick={
                  previousTask ? () => displayTaskDetails(previousTask) : null
                }
                onNextTaskClick={
                  nextTask ? () => displayTaskDetails(nextTask) : null
                }
              />
            </div>
          )}

          {showNewTask && (
            <div className="min-w-96 max-w-96 overflow-clip">
              <NewTask onClose={() => setShowNewTask(false)} />
            </div>
          )}
        </div>

        <BottomBar
          isCommandsActive={showTerminal}
          onCommandsClick={() => setShowTerminal(!showTerminal)}
        />

        <Terminal className="flex-1 overflow-clip" show={showTerminal} />
      </div>
    </>
  );
}

function CountTasksByStatus({ tasks }) {
  const count = {};
  tasks.forEach((task) => {
    let status = getRealTaskStatus(task);
    count[status] = (count[status] || 0) + 1;
  });

  return (
    <BadgeList>
      {count["pending"] && <Badge text={count["pending"]} variant="yellow" />}
      {count["waiting"] && <Badge text={count["waiting"]} variant="indigo" />}
      {count["completed"] && (
        <Badge text={count["completed"]} variant="green" />
      )}
    </BadgeList>
  );
}
