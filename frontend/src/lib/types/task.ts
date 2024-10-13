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

export const taskSchema = z.object({
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

export const taskArraySchema = taskSchema.array();

export const taskGroupSchema = z.object({
  name: z
    .string()
    // XXX:
    // This logic is necessary for ipc.getGroupedTasks functionality.
    // Although placing it here is not ideal, it offers a quick and straightforward solution.
    .transform((name) => {
      let parsed = JSON.parse(name);
      if (parsed) {
        return new Date(parsed).toISOString();
      }
      return null;
    })
    .nullable(),
  tasks: taskArraySchema,
});

export const taskGroupArraySchema = taskGroupSchema.array();

export interface Task extends z.infer<typeof taskSchema> {
  // TODO:
  favorite: boolean;
}

export interface TaskGroup extends z.infer<typeof taskGroupSchema> {}
