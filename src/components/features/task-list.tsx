import { ButtonList } from "../utils/button-utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomBadge, TaskStatusBadge } from "@/components/utils/badge-utils";
import { TooltipWrapper } from "@/components/utils/tooltip-utils";
import { cn, toLocalTimeago, toLocaleDateString } from "@/lib/utils";
import { Task, TaskStatus } from "@/types/task";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { CalendarClockIcon, PlusIcon, SquarePenIcon } from "lucide-react";
import React from "react";

interface BadgeListProps {
  task: Task;
}

interface TaskItemProps {
  task: Task;
  active: boolean;
  onSelect: () => void;
}

interface TaskListProps {
  tasks: Task[];
  selectedTask: Task | null;
  onTaskSelect: (task: Task | null) => void;
}

interface CustomButtonProps extends ButtonProps {
  className?: string;
  size?: "default" | "sm";
  tooltip: React.ReactNode;
  // TODO: fix the type (LucideIcon?)
  Icon: any;
}

function BadgeList({ task }: BadgeListProps) {
  const { due, status } = task;

  return (
    <div className="flex items-center gap-1.5">
      <TaskStatusBadge status={status} />

      {due && (
        <TooltipWrapper
          content={<p>{toLocaleDateString(due)}</p>}
          asChild={false}
        >
          <CustomBadge
            className="!bg-yellow-100 !text-yellow-800"
            Icon={CalendarClockIcon}
          >
            {toLocalTimeago(due)}
          </CustomBadge>
        </TooltipWrapper>
      )}

      <TooltipWrapper content="Add a new property">
        <Button
          variant="outline"
          size="icon_xs"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <PlusIcon className="size-3 text-muted-foreground" />
        </Button>
      </TooltipWrapper>
    </div>
  );
}

function CustomButton({
  className,
  size = "default",
  tooltip,
  Icon,
  ...props
}: CustomButtonProps) {
  return (
    <TooltipWrapper content={<p>{tooltip}</p>}>
      <Button
        variant="ghost"
        size="icon_xs"
        className={cn("text-muted-foreground/50", className)}
        {...props}
      >
        <Icon className={{ default: "size-5", sm: "size-4" }[size]} />
      </Button>
    </TooltipWrapper>
  );
}

function TaskItem({ task, active, onSelect }: TaskItemProps) {
  const { description, favorite, status } = task;

  return (
    <div
      className={cn(
        "group cursor-pointer transition-shadow hover:z-10 hover:shadow-[0px_4px_12px_0px_rgba(0,_0,_0,_0.1)]",
        active && "bg-primary text-primary-foreground",
      )}
    >
      <div
        className={cn(
          "items-top flex gap-x-2 p-3",
          !active && "data-[favorite=true]:bg-amber-50/50",
          active && "dark",
        )}
        data-favorite={favorite}
        onClick={onSelect}
      >
        <Checkbox
          className="ms-2 rounded-full"
          checked={status === TaskStatus.COMPLETED}
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
        <div className="grid grow gap-1.5 leading-none">
          <div className="-my-[0.3125rem] flex items-center gap-1">
            <p className="text-sm font-medium leading-none">{description}</p>

            <CustomButton
              className="opacity-0 focus:opacity-100 group-hover:opacity-100"
              size="sm"
              tooltip="Edit"
              onClick={(event) => {
                event.stopPropagation();
              }}
              Icon={SquarePenIcon}
            />
          </div>

          <BadgeList task={task} />

          <p className="text-sm text-muted-foreground">
            Lorem ipsum, this is an extra note
          </p>
        </div>

        <div>
          <ButtonList size="sm">
            <CustomButton
              tooltip="Add to favorites"
              Icon={favorite ? StarFilledIcon : StarIcon}
              className="hover:text-amber-600 data-[favorite=true]:text-amber-600"
              data-favorite={favorite}
              onClick={(event) => {
                event.stopPropagation();
              }}
            />
          </ButtonList>
        </div>
      </div>
    </div>
  );
}

function TaskList({ tasks, selectedTask, onTaskSelect }: TaskListProps) {
  return (
    <div className="flex flex-col divide-y overflow-y-auto pb-24">
      {tasks.map((task, index) => {
        const isActive = task === selectedTask;
        return (
          <div
            key={index}
            className={
              // NB: `overflow-x-clip` is used to prevent the TaskItem shadow from leaking horizontally
              "overflow-x-clip"
            }
          >
            <TaskItem
              task={task}
              active={isActive}
              onSelect={() => onTaskSelect(isActive ? null : task)}
            />
          </div>
        );
      })}
    </div>
  );
}

export { TaskList };
