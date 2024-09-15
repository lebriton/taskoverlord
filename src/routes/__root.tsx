import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
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
  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const navigate = useNavigate({ from: pathname });

  return (
    <>
      <Tabs value={pathname} onValueChange={(value) => navigate({ to: value })}>
        <TabsList>
          {tabsList.map((item, index) => (
            <TabsTrigger key={index} value={item.pathname}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
