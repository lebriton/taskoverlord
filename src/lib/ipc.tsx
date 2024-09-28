import { Task, TaskSchema } from "@/lib/types/task";
import { invoke as invokeTauri } from "@tauri-apps/api/core";

async function invoke<T>(command: string, params: Record<string, unknown> = {}): Promise<T> {
  try {
    return await invokeTauri<T>(command, params);
  } catch (reason) {
    console.error(`[invoke tauri] Command '${command}' failed with parameters: ${JSON.stringify(params)}`, { reason });
    throw reason;
  }
}

export async function getTasks(...args: any[]): Promise<Task[]> {
  return invoke<Task[]>("get_tasks", ...args).then((tasks) =>
    tasks.map((task) => {
      try {
        const parsed = TaskSchema.parse(task);
        return {
          ...parsed,
          // TODO:
          favorite: false,
        };
      } catch (parseError) {
        console.error("[getTasks] Failed to parse task", { task, parseError });
        throw parseError;
      }
    }),
  );
}
