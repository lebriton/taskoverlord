import { ButtonList } from "../custom/button-utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toLocalTimeago, toLocaleDateString } from "@/lib/utils";
import { Task } from "@/types/task";
import { CalendarClockIcon, PlusIcon, StarIcon } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
}

function TaskItem({ description, due, favorite, id, status }: Task) {
  // TODO: find a format convention
  const checkboxId = `task-${id}`;

  return (
    <label
      htmlFor={checkboxId}
      className="items-top flex gap-x-2 p-3 transition-shadow hover:z-10 hover:shadow-[0px_4px_12px_0px_rgba(0,_0,_0,_0.1)] data-[favorite=true]:bg-amber-50/50"
      data-favorite={favorite}
    >
      <Checkbox id={checkboxId} className="ms-2 rounded-full" />
      <div className="grid grow gap-1.5 leading-none">
        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {description}
        </p>
        <div className="flex items-baseline gap-1.5">
          {due && (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="secondary">
                    <CalendarClockIcon className="me-1 size-3" />
                    <span className="first-letter:uppercase">
                      {toLocalTimeago(due)}
                    </span>
                  </Badge>
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
        <p className="text-sm text-muted-foreground">
          Lorem ipsum, this is an extra note
        </p>
      </div>

      <div className="-mt-1.5">
        <ButtonList size="sm">
          <Button
            variant="ghost"
            size="icon_sm"
            className="text-muted-foreground/50 hover:text-amber-600 data-[favorite=true]:text-amber-600"
            data-favorite={favorite}
          >
            <StarIcon className="size-4" />
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
          <TaskItem key={index} {...task} />
        </div>
      ))}
    </div>
  );
}

export { TaskList };
