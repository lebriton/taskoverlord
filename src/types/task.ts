export enum TaskStatus {
  PENDING = "pending",
  WAITING = "waiting",
  IN_PROGRESS = "in progress",
  COMPLETED = "completed",
}

export interface TaskGroup {
  name: string;
  tasks: Task[];
}

export interface Task {
  description: string;
  due?: Date;
  favorite: boolean;
  id: number;
  status: TaskStatus;
}
