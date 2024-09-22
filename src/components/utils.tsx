import { Badge, type BadgeProps } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TaskStatus } from "@/types/task";
import {
  CircleIcon,
  StopwatchIcon,
  CheckCircledIcon,
  ClockIcon,
} from "@radix-ui/react-icons";
import { PropsWithChildren } from "react";

interface CustomBadgeProps extends BadgeProps {
  // TODO: fix the type (LucideIcon?)
  Icon?: any;
}

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

interface TooltipWrapperProps {
  content: React.ReactNode;
  delayDuration?: number;
  side?: "right" | "top" | "bottom" | "left"; // TODO: import the correct type (enum?)
  align?: "center" | "end" | "start"; // TODO: use the correct type (enum?)
  asChild?: boolean;
}

function CustomBadge({
  Icon,
  children,
  ...props
}: PropsWithChildren<CustomBadgeProps>) {
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
    [TaskStatus.WAITING]: ClockIcon,
    [TaskStatus.IN_PROGRESS]: StopwatchIcon,
    [TaskStatus.COMPLETED]: CheckCircledIcon,
  }[status];

  return (
    <CustomBadge
      className={cn(
        "text-white",

        status === TaskStatus.PENDING && "border-yellow-700 !bg-yellow-600",
        status === TaskStatus.WAITING && "border-gray-700 !bg-gray-600",
        status === TaskStatus.IN_PROGRESS && "border-blue-700 !bg-blue-600",
        status === TaskStatus.COMPLETED && "border-green-700 !bg-green-600",
      )}
      variant="secondary"
      Icon={Icon}
    >
      {status}
    </CustomBadge>
  );
}

function TooltipWrapper({
  content,
  delayDuration = 0.5,
  side = "top",
  align = "center",
  asChild = true,
  children,
}: PropsWithChildren<TooltipWrapperProps>) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { CustomBadge, TaskStatusBadge, TooltipWrapper };
