import { createLazyFileRoute } from "@tanstack/react-router";
import TasksTable from "../components/organisms/TasksTable";
import { useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/tauri";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    // TODO: handle errors
    queryFn: async () => await invoke("get_all_tasks"),
    initialData: [],
  });

  return <TasksTable tasks={tasksQuery.data}></TasksTable>;
}
