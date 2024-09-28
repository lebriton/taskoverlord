import { Badge, type BadgeProps } from "@/components/ui/badge";
import { TaskStatus } from "@/lib/types/task";
import { Task } from "@/lib/types/task";
import { cn } from "@/lib/utils";
import { CircleIcon, CheckCircledIcon, ClockIcon, CrossCircledIcon, DiscIcon } from "@radix-ui/react-icons";
import { PropsWithChildren } from "react";

interface CustomBadgeProps extends BadgeProps {
  // TODO: fix the type (LucideIcon?)
  Icon?: any;
}

interface TaskIdBadgeProps {
  task: Task;
}

interface TaskStatusBadgeProps {
  task: Task;
}

function CustomBadge({ Icon, children, ...props }: PropsWithChildren<CustomBadgeProps>) {
  return (
    <Badge {...props}>
      {Icon && <Icon className="me-1 size-3" />}
      <span className="first-letter:uppercase">{children}</span>
    </Badge>
  );
}

function TaskIdBadge({ task }: TaskIdBadgeProps) {
  return <CustomBadge className="!rounded-full !bg-indigo-100 !px-1.5 !text-indigo-800">ID: {task.id}</CustomBadge>;
}

function TaskStatusBadge({ task }: TaskStatusBadgeProps) {
  let status: TaskStatus = task.status;

  // TODO: this should not be done here
  if (status === TaskStatus.PENDING && task.wait) {
    status = TaskStatus.WAITING;
  }
  if (status === TaskStatus.PENDING && task.recur && !task.parent) {
    status = TaskStatus.RECURRING;
  }

  const Icon = {
    [TaskStatus.PENDING]: CircleIcon,
    [TaskStatus.DELETED]: CrossCircledIcon,
    [TaskStatus.COMPLETED]: CheckCircledIcon,
    [TaskStatus.WAITING]: ClockIcon,
    [TaskStatus.RECURRING]: DiscIcon,
  }[status];

  return (
    <CustomBadge
      className={cn(
        "text-white",

        status === TaskStatus.PENDING && "border-yellow-700 !bg-yellow-600",
        status === TaskStatus.DELETED && "border-rose-700 !bg-rose-600",
        status === TaskStatus.COMPLETED && "border-green-700 !bg-green-600",
        status === TaskStatus.WAITING && "border-gray-700 !bg-gray-600",
        status === TaskStatus.RECURRING && "border-blue-700 !bg-blue-600",
      )}
      variant="secondary"
      Icon={Icon}
    >
      {status}
    </CustomBadge>
  );
}

export { CustomBadge, TaskIdBadge, TaskStatusBadge };
