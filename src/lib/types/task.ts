import { z } from "zod";

const preprocessDate = (dateStr: string): Date => new Date(dateStr);
const preprocessNullableDate = (dateStr: string | null): Date | null => (dateStr ? new Date(dateStr) : null);

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
  start: z.string().datetime({ local: true }).nullable().transform(preprocessNullableDate),
  end: z.string().datetime({ local: true }).nullable().transform(preprocessNullableDate),
  due: z.string().datetime({ local: true }).nullable().transform(preprocessNullableDate),
  until: z.string().datetime({ local: true }).nullable().transform(preprocessNullableDate),
  wait: z.string().datetime({ local: true }).nullable().transform(preprocessNullableDate),
  modified: z.string().datetime({ local: true }).transform(preprocessDate),
  scheduled: z.string().datetime({ local: true }).nullable().transform(preprocessNullableDate),
  recur: z.string().nullable(),
  mask: z.string().nullable(),
  imask: z.number().nullable(),
  parent: z.string().nullable(),
  project: z.string().nullable(),
  priority: z.string().nullable(),
  depends: z.string().nullable(),
  tags: z.array(z.string()).nullable(),
  annotations: z
    .array(
      z.object({
        entry: z.string().datetime({ local: true }).transform(preprocessDate),
        description: z.string(),
      }),
    )
    .nullable(),

  id: z.number(),
  urgency: z.number(),
});

export interface Task extends z.infer<typeof TaskSchema> {
  // TODO:
  favorite: boolean;
}
