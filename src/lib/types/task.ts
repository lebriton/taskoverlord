import { z } from "zod";

const preprocessDate = (dateStr: string | null): Date | null => (dateStr ? new Date(dateStr) : null);

export enum TaskStatus {
  PENDING = "pending",
  DELETED = "deleted",
  COMPLETED = "completed",
  WAITING = "waiting",
  RECURRING = "recurring",
}

export interface TaskGroup {
  name: string;
  tasks: Task[];
}

export const TaskSchema = z.object({
  status: z.nativeEnum(TaskStatus),
  uuid: z.string(),
  entry: z.string().datetime({ local: true }).transform(preprocessDate),
  description: z.string(),
  start: z.string().datetime({ local: true }).nullable().transform(preprocessDate),
  end: z.string().datetime({ local: true }).nullable().transform(preprocessDate),
  due: z.string().datetime({ local: true }).nullable().transform(preprocessDate),
  until: z.string().datetime({ local: true }).nullable().transform(preprocessDate),
  wait: z.string().datetime({ local: true }).nullable().transform(preprocessDate),
  modified: z.string().datetime({ local: true }).transform(preprocessDate),
  scheduled: z.string().datetime({ local: true }).nullable().transform(preprocessDate),
  recur: z.string().nullable(),
  mask: z.string().nullable(),
  imask: z.number().nullable(),
  parent: z.string().nullable(),
  project: z.string().nullable(),
  priority: z.string().nullable(),
  depends: z.string().nullable(),
  tags: z.array(z.string()).nullable(),
  annotation: z.array(z.string()).nullable(),

  id: z.number(),
  urgency: z.number(),
});

export interface Task extends z.infer<typeof TaskSchema> {
  // TODO:
  favorite: boolean;
}
