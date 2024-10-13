import { Task, taskArraySchema, taskGroupArraySchema, taskSchema } from "@/lib/types/task";
import { invoke as invokeTauri } from "@tauri-apps/api/core";
import { z } from "zod";

function invoke<T>(command: string, params: Record<string, unknown> = {}): Promise<T> {
  return invokeTauri<T>(command, params).catch((reason) => {
    console.error(`[invokeTauri] Command failed`, command, params, reason);
    throw reason;
  });
}

export function addTask(...args: any[]): Promise<Task> {
  return invoke<Task>("add_task", ...args).then((response) => taskSchema.parse(response) as Task);
}

const getGroupedTasksSchema = z.object({
  group_count: z.number(),
  task_count: z.number(),
  data: taskGroupArraySchema,
});
type GetGroupedTasksResponse = z.infer<typeof getGroupedTasksSchema>;
export function getGroupedTasks(...args: any[]): Promise<GetGroupedTasksResponse> {
  return invoke<GetGroupedTasksResponse>("get_grouped_tasks", ...args).then(
    (response) => getGroupedTasksSchema.parse(response) as GetGroupedTasksResponse,
  );
}

export function getTask(...args: any[]): Promise<Task> {
  return invoke<Task>("get_task", ...args).then((response) => taskSchema.parse(response) as Task);
}

export function getTasks(...args: any[]): Promise<Task[]> {
  return invoke<Task[]>("get_tasks", ...args).then((response) => taskArraySchema.parse(response) as Task[]);
}
