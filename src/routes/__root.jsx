import React from "react";
import {
  TableCellsIcon,
  ViewColumnsIcon,
  Bars3BottomRightIcon,
} from "@heroicons/react/24/outline";
import NavigationTabs from "../components/organisms/NavigationTabs";
import { getRealTaskStatus } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/tauri";
import Badge, { BadgeList } from "../components/atoms/Badge";
import Heading3 from "../components/molecules/Heading3";
import FlexLine from "../components/templates/FlexLine";
import Button from "../components/atoms/Button";
import { FunnelIcon } from "@heroicons/react/24/outline";
import Card, { CardBody } from "../components/molecules/Card";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import BottomBar from "../components/organisms/BottomBar";

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

  return (
    <>
      <div className="flex h-screen w-screen flex-col overflow-hidden">
        <div className="flex-1 p-3">
          <Main tasksQuery={tasksQuery} />
        </div>
        <BottomBar />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
      <ReactQueryDevtools buttonPosition="bottom-right" />
    </>
  );
}

function Main({ tasksQuery }) {
  const links = [
    { label: "Table View", url: "/", Icon: TableCellsIcon, shortcut: "t" },
    { label: "Kanban Board", url: "/", Icon: ViewColumnsIcon, shortcut: "k" },
    {
      label: "Gantt Diagram",
      url: "/",
      Icon: Bars3BottomRightIcon,
      shortcut: "g",
    },
  ];

  return (
    <Card className="h-full">
      <CardBody>
        <FlexLine
          left={
            <Heading3
              className="mb-2"
              title="Tasks"
              badgeText={tasksQuery.data.length}
            />
          }
          middle={<NavigationTabs className="-mt-4" links={links} />}
          right={
            <div className="mb-2">
              <CountTasksByStatus tasks={tasksQuery.data} />
              <Button label="Filter" Icon={FunnelIcon} />
            </div>
          }
        />
        <Outlet />
      </CardBody>
    </Card>
  );
}

function CountTasksByStatus({ tasks }) {
  const count = {};
  tasks.forEach((task) => {
    let status = getRealTaskStatus(task);
    count[status] = (count[status] || 0) + 1;
  });

  return (
    <BadgeList className={"me-3"}>
      {count["pending"] && <Badge text={count["pending"]} variant="yellow" />}
      {count["waiting"] && <Badge text={count["waiting"]} variant="indigo" />}
      {count["completed"] && (
        <Badge text={count["completed"]} variant="green" />
      )}
    </BadgeList>
  );
}
