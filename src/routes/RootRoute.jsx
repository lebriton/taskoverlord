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
import Button, { ButtonList } from "../components/atoms/Button";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import BottomBar from "../components/organisms/BottomBar";
import Checkbox from "../components/molecules/Checkbox";
import FloatingTerminal from "../components/organisms/FloatingTerminal";
import RightFloatingColumn from "../components/molecules/RightFloatingColumn";
import Label from "../components/atoms/Label";
import Input from "../components/atoms/Input";
import FormGroup from "../components/atoms/FormGroup";

export default function RootRoute() {
  const queryClient = useQueryClient();
  const tasksQuery = useSuspenseQuery({
    queryKey: ["tasks"],
    // TODO: handle errors
    queryFn: async () => await invoke("get_all_tasks"),
  });
  const projectsQuery = useSuspenseQuery({
    queryKey: ["projects"],
    // TODO: handle errors
    queryFn: async () => await invoke("get_project_names"),
  });
  const projects = projectsQuery.data.map((project, idx) => ({
    text: project,
    shortcut: (idx + 1).toString(),
  }));
  const [selectedTask, setSelectedTask] = useState(null);
  const displayTask = (task) => {
    setSelectedTask(task);
    setShowTaskDetails(true);
  };
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showFloatingTerminal, setShowFloatingTerminal] = useState(false);
  const [showRightFloatingColumn, setShowRightFloatingColumn] = useState(false);

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

  return (
    <>
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
                  onChange={() => {
                    if (showTaskDetails) {
                      setSelectedTask(null);
                    }
                    setShowTaskDetails(!showTaskDetails);
                  }}
                />
              </ShortcutWrap>

              <Button
                variant="green"
                Icon={PlusCircleIcon}
                shortcutText="a"
                onClick={() => setShowRightFloatingColumn(true)}
              >
                New task
              </Button>
            </div>
          }
        />

        <div className="flex grow divide-x overflow-clip">
          <div className="grow overflow-clip bg-neutral-50">
            <Outlet context={[tasksQuery, selectedTask, displayTask]} />
          </div>

          {showTaskDetails && (
            <div className="min-w-96 max-w-96 overflow-clip">
              <TaskDetails
                task={selectedTask}
                onClose={() => {
                  setShowTaskDetails(false);
                  setSelectedTask(null);
                }}
              />
            </div>
          )}
        </div>

        <BottomBar
          isCommandsActive={showFloatingTerminal}
          onCommandsClick={() => setShowFloatingTerminal(!showFloatingTerminal)}
        />

        <FloatingTerminal
          show={showFloatingTerminal}
          onClose={() => setShowFloatingTerminal(false)}
        />

        <RightFloatingColumn
          headingTitle="Add a task"
          show={showRightFloatingColumn}
          bottom={
            <div className="flex justify-end">
              <ButtonList>
                <Button
                  size="sm"
                  onClick={() => setShowRightFloatingColumn(false)}
                >
                  Cancel
                </Button>
                <Button variant="blue" size="sm">
                  Add task
                </Button>
              </ButtonList>
            </div>
          }
          onClose={() => setShowRightFloatingColumn(false)}
        >
          <FormGroup>
            <Label text="Description" />
            <Input />
          </FormGroup>

          <FormGroup>
            <Label text="Project" isOptional />
            <Input />
          </FormGroup>

          <FormGroup>
            <Label text="Tags" isOptional />
            <Input />
          </FormGroup>
        </RightFloatingColumn>
      </div>

      <ReactQueryDevtools buttonPosition="bottom-right" />
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
