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
import NavigationTabs from "../components/organisms/NavigationTabs";
import { getRealTaskStatus } from "../utils";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/tauri";
import Badge, { BadgeList } from "../components/atoms/Badge";
import { Outlet } from "react-router-dom";
import Heading3 from "../components/molecules/Heading3";
import FlexLine from "../components/molecules/FlexLine";
import Button from "../components/atoms/Button";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import BottomBar from "../components/organisms/BottomBar";
import Checkbox from "../components/molecules/Checkbox";
import SelectMenu from "../components/molecules/SelectMenu";
import FloatingTerminal from "../components/organisms/FloatingTerminal";

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
      <div className="flex h-screen w-screen flex-col overflow-hidden">
        <FlexLine
          className="gap-6 px-3"
          left={
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center justify-end gap-3">
                <SelectMenu
                  className="w-40"
                  items={projects}
                  defaultItem={{ text: "Select a project", shortcut: "0" }}
                />

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
              </div>

              <CountTasksByStatus tasks={tasksQuery.data} />
            </div>
          }
          center={<NavigationTabs links={links} />}
          right={
            <div className="flex items-center justify-end gap-3">
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

              <Button Icon={FunnelIcon} shortcutText="f">
                Filter
              </Button>

              <Button variant="green" Icon={PlusCircleIcon} shortcutText="a">
                New task
              </Button>
            </div>
          }
        />

        <div className="mx-3 mb-3 flex-1 overflow-scroll">
          <Outlet context={[tasksQuery, selectedTask, displayTask]} />
        </div>

        {showTaskDetails && (
          // TODO:
          <TaskDetails
            task={selectedTask}
            onClose={() => {
              setShowTaskDetails(false);
              setSelectedTask(null);
            }}
          />
        )}

        <BottomBar
          isCommandsActive={showFloatingTerminal}
          onCommandsClick={() => setShowFloatingTerminal(!showFloatingTerminal)}
        />

        <FloatingTerminal
          show={showFloatingTerminal}
          onClose={() => setShowFloatingTerminal(false)}
        />
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
