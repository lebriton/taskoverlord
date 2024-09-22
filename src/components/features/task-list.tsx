import { ButtonList } from "../custom/button-utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CustomBadge, TaskStatusBadge } from "@/components/utils";
import { toLocalTimeago, toLocaleDateString } from "@/lib/utils";
import { Task } from "@/types/task";
import {
  CalendarClockIcon,
  PlusIcon,
  SettingsIcon,
  SquarePenIcon,
  StarIcon,
} from "lucide-react";

interface BadgeListProps {
  task: Task;
}

interface TaskItemProps {
  task: Task;
}

interface TaskListProps {
  tasks: Task[];
}

function BadgeList({ task }: BadgeListProps) {
  const { due, status } = task;

  return (
    <div className="flex items-center gap-1.5">
      <TaskStatusBadge status={status} />

      {due && (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <CustomBadge variant="secondary" Icon={CalendarClockIcon}>
                {toLocalTimeago(due)}
              </CustomBadge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{toLocaleDateString(due)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <Button variant="outline" size="icon_xs">
        <PlusIcon className="size-3 text-muted-foreground" />
      </Button>
    </div>
  );
}

function TaskItem({ task }: TaskItemProps) {
  const { description, favorite, id } = task;

  // TODO: find a format convention
  const checkboxId = `task-${id}`;

  return (
    <label
      htmlFor={checkboxId}
      className="items-top group flex cursor-pointer gap-x-2 p-3 transition-shadow hover:z-10 hover:shadow-[0px_4px_12px_0px_rgba(0,_0,_0,_0.1)] data-[favorite=true]:bg-amber-50/50"
      data-favorite={favorite}
    >
      <Checkbox id={checkboxId} className="ms-2 rounded-full" />
      <div className="grid grow gap-1.5 leading-none">
        <div className="-my-[0.3125rem] flex items-center gap-1">
          <p className="text-sm font-medium leading-none">{description}</p>

          <Button
            className="opacity-0 transition-opacity focus:opacity-100 group-hover:opacity-100"
            variant="ghost"
            size="icon_xs"
          >
            <SquarePenIcon className="size-4 text-muted-foreground" />
          </Button>
        </div>

        <BadgeList task={task} />

        <p className="text-sm text-muted-foreground">
          Lorem ipsum, this is an extra note
        </p>
      </div>

      <div>
        <ButtonList size="sm">
          <Button
            variant="ghost"
            size="icon_xs"
            className="text-muted-foreground/50 hover:text-amber-600 data-[favorite=true]:text-amber-600"
            data-favorite={favorite}
          >
            <StarIcon className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon_xs"
            className="text-muted-foreground/50"
            data-favorite={favorite}
          >
            <SettingsIcon className="size-4" />
          </Button>
        </ButtonList>
      </div>
    </label>
  );
}

function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="flex flex-col divide-y overflow-y-auto pb-24">
      {tasks.map((task, index) => (
        <div
          className={
            // NB: `overflow-x-clip` is used to prevent the TaskItem shadow from leaking horizontally
            "overflow-x-clip"
          }
        >
          <TaskItem key={index} task={task} />
        </div>
      ))}
    </div>
  );
}

export { TaskList };
