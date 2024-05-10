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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/tauri";
import Badge, { BadgeList } from "../components/atoms/Badge";
import Heading3 from "../components/molecules/Heading3";
import FlexLine from "../components/molecules/FlexLine";
import Button from "../components/atoms/Button";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import BottomBar from "../components/organisms/BottomBar";
import Checkbox from "../components/molecules/Checkbox";
import SelectMenu from "../components/molecules/SelectMenu";

export const Route = createRootRouteWithContext()({
  component: RootComponent,
});

function RootComponent() {
  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    // TODO: handle errors
    queryFn: async () => await invoke("get_all_tasks"),
    initialData: [],
  });
  // TODO:
  const [selectedTask, setSelectedTask] = useState(tasksQuery.data[0]);

  const [showTaskDetails, setShowTaskDetails] = useState(true);

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

  const queryClient = useQueryClient();

  // TODO:
  const projectList = ["Project 1", "Project 2", "Project 3"];

  return (
    <>
      <div className="flex h-screen w-screen flex-col overflow-hidden">
        <FlexLine
          className="z-50 gap-6 px-3"
          left={
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center justify-end gap-3">
                <SelectMenu
                  className="w-32"
                  items={projectList}
                  defaultText="No project"
                />

                <Heading3 title="Tasks" badgeText={tasksQuery.data.length} />

                <Button
                  Icon={ArrowPathIcon}
                  variant="no-outline"
                  onClick={() =>
                    queryClient.invalidateQueries({ queryKey: ["tasks"] })
                  }
                />
              </div>

              <CountTasksByStatus tasks={tasksQuery.data} />
            </div>
          }
          middle={<NavigationTabs links={links} />}
          right={
            <div className="flex items-center justify-end gap-3">
              <ShortcutWrap Shortcut={<Shortcut text="p" />}>
                <Checkbox
                  className="text-sm"
                  label="Show task details"
                  checked={showTaskDetails}
                  onChange={() => setShowTaskDetails(!showTaskDetails)}
                />
              </ShortcutWrap>

              <Button Icon={FunnelIcon}>Filter</Button>

              <Button variant="green" Icon={PlusCircleIcon}>
                New task
              </Button>
            </div>
          }
        />

        <div className="mx-3 mb-3 flex-1 overflow-scroll">
          <Outlet />
        </div>

        {showTaskDetails && (
          // TODO:
          <TaskDetails
            task={tasksQuery.data?.[0]}
            onClose={() => setShowTaskDetails(false)}
          />
        )}

        <BottomBar />
      </div>

      <TanStackRouterDevtools position="bottom-right" />
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
