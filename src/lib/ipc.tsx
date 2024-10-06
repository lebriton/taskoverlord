import { Task, taskSchema } from "@/lib/types/task";
import { invoke as invokeTauri } from "@tauri-apps/api/core";

async function invoke<T>(command: string, params: Record<string, unknown> = {}): Promise<T> {
  try {
    return await invokeTauri<T>(command, params);
  } catch (reason) {
    console.error(`[invokeTauri] Command '${command}' failed with parameters: ${JSON.stringify(params)}`, { reason });
    throw reason;
  }
}

function _parseTask(task: any): Task {
  try {
    const parsed = taskSchema.parse(task);
    return {
      ...parsed,
      // TODO:
      favorite: false,
    };
  } catch (parseError) {
    console.error("[_parseTask] Failed to parse task", { task, parseError });
    throw parseError;
  }
}

export async function getTask(...args: any[]): Promise<Task> {
  return invoke<Task>("get_task", ...args).then(_parseTask);
}

export async function getTasks(...args: any[]): Promise<Task[]> {
  return invoke<Task[]>("get_tasks", ...args).then((tasks) => tasks.map(_parseTask));
}
