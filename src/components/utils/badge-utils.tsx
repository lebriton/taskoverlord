import { Badge, type BadgeProps } from "@/components/ui/badge";
import { TaskStatus } from "@/lib/types/task";
import { cn } from "@/lib/utils";
import { CircleIcon, CheckCircledIcon, ClockIcon, CrossCircledIcon, DiscIcon } from "@radix-ui/react-icons";
import { PropsWithChildren } from "react";

interface CustomBadgeProps extends BadgeProps {
  // TODO: fix the type (LucideIcon?)
  Icon?: any;
}

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

function CustomBadge({ Icon, children, ...props }: PropsWithChildren<CustomBadgeProps>) {
  return (
    <Badge {...props}>
      {Icon && <Icon className="me-1 size-3" />}
      <span className="first-letter:uppercase">{children}</span>
    </Badge>
  );
}

function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
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
        status === TaskStatus.DELETED && "border-red-700 !bg-red-600",
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

export { CustomBadge, TaskStatusBadge };
