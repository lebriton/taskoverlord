import { z } from "zod";

const preprocessDate = (dateStr: string | null): Date | null => (dateStr ? new Date(dateStr) : null);

export enum TaskStatus {
  PENDING = "pending",
  WAITING = "waiting",
  IN_PROGRESS = "in progress",
  COMPLETED = "completed",
  DELETED = "deleted",
}

export interface TaskGroup {
  name: string;
  tasks: Task[];
}

export const TaskSchema = z.object({
  description: z.string(),
  due: z.string().datetime({ local: true }).nullable().transform(preprocessDate),
  entry: z.string().datetime({ local: true }).transform(preprocessDate),
  id: z.number(),
  modified: z.string().datetime({ local: true }).transform(preprocessDate),
  priority: z.string().nullable(),
  project: z.string().nullable(),
  start: z.string().datetime({ local: true }).nullable().transform(preprocessDate),
  status: z.nativeEnum(TaskStatus),
  tags: z.array(z.string()).nullable(),
  urgency: z.number(),
  uuid: z.string(),
  wait: z.string().datetime({ local: true }).nullable().transform(preprocessDate),
});

export interface Task extends z.infer<typeof TaskSchema> {
  // TODO:
  favorite: boolean;
}
