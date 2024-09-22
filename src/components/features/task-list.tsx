import { ButtonList } from "../custom/button-utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/types/task";
import { StarIcon } from "lucide-react";

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
        <p className="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
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
    <div className="flex max-h-full flex-col divide-y overflow-y-auto overflow-x-hidden pb-24">
      {tasks.map((task, index) => (
        <TaskItem key={index} {...task} />
      ))}
    </div>
  );
}

export { TaskList };
