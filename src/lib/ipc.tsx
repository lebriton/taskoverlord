import { Task, TaskSchema } from "@/lib/types/task";
import { invoke } from "@tauri-apps/api/core";

export async function getTasks(...args: any[]): Promise<Task[]> {
  return invoke<Task[]>("get_tasks", ...args).then((tasks) =>
    tasks.map((task) => {
      return {
        ...TaskSchema.parse(task),
        favorite: false,
      };
    }),
  );
}
