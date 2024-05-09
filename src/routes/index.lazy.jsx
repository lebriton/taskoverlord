import { createLazyFileRoute } from "@tanstack/react-router";
import TasksTable from "../components/organisms/TasksTable";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const tasksQuery = useSuspenseQuery({ queryKey: ["tasks"] });
  return <TasksTable tasks={tasksQuery.data}></TasksTable>;
}
