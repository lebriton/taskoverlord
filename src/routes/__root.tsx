import Navbar from "@/components/layout/navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: Root,
});

const tabsList = [
  {
    label: "Table view",
    pathname: "/table-view",
  },
  {
    label: "Kanban board",
    pathname: "/kanban-board",
  },
  {
    label: "Gantt diagram",
    pathname: "/gantt-diagram",
  },
  {
    label: "Calendar",
    pathname: "/calendar",
  },
];

function Root() {
  return (
    <>
      <Navbar tabsList={tabsList} />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
