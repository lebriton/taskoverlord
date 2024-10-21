import { ActionButtons } from "../utils/button-utils";
import {
  AnnotationsIcon,
  DueDateIcon,
  ScheduledDateIcon,
  UntilDateIcon,
  UrgencyIcon,
  WaitDateIcon,
} from "../utils/icon-utils";
import { Group, GroupList } from "@/components/custom/group";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TooltipWrapper } from "@/components/utils/tooltip-utils";
import { Task, TaskGroup, TaskStatus } from "@/lib/ipc";
import { round } from "@/lib/math";
import { cn, toLocaleTimeago, toLocaleDateString } from "@/lib/utils";
import { PlusIcon, StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { CopyIcon, DiamondPlusIcon, Edit3Icon, Trash2Icon } from "lucide-react";
import { PropsWithChildren } from "react";
import Pluralize from "react-pluralize";

interface TaskItemProps {
  task: Task;
  selected: boolean;
  onSelect: () => void;
}

interface AttributeProps {
  className?: string;
  // TODO: fix the type (LucideIcon?)
  Icon?: any;
  bold?: boolean;
}

interface AttributeListProps {
  task: Task;
}

interface TaskListProps {
  groupedTasks: TaskGroup[];
  selectedTaskUuid: string | null;
  onTaskSelect: (uuid: string | null) => void;
}

function Attribute({ className, Icon, children, bold = false }: PropsWithChildren<AttributeProps>) {
  return (
    <div
      className={cn("flex items-center gap-0.5 text-[0.8rem] text-muted-foreground", bold && "font-medium", className)}
    >
      {Icon && <Icon className="mb-0.5 size-[0.8rem] shrink-0" />}
      <div className="first-letter:uppercase">{children}</div>
    </div>
  );
}

function AttributeList({ task }: AttributeListProps) {
  const { annotations, urgency, due, scheduled, wait, until } = task;

  return (
    <>
      {annotations && (
        <TooltipWrapper
          content={
            <p>
              <Pluralize singular={"annotation"} count={annotations.length} />
            </p>
          }
          asChild={false}
        >
          <Attribute Icon={AnnotationsIcon}>{annotations.length}</Attribute>
        </TooltipWrapper>
      )}

      {due && (
        <TooltipWrapper
          content={
            <p>
              Due:
              <br />
              {toLocaleDateString(due)}
            </p>
          }
          asChild={false}
        >
          <Attribute className="text-yellow-600" Icon={DueDateIcon} bold>
            {toLocaleTimeago(due)}
          </Attribute>
        </TooltipWrapper>
      )}

      {scheduled && (
        <TooltipWrapper
          content={
            <p>
              Scheduled:
              <br />
              {toLocaleDateString(scheduled)}
            </p>
          }
          asChild={false}
        >
          <Attribute className="text-lime-600" Icon={ScheduledDateIcon} bold>
            {toLocaleTimeago(scheduled)}
          </Attribute>
        </TooltipWrapper>
      )}

      {wait && (
        <TooltipWrapper
          content={
            <p>
              Wait:
              <br />
              {toLocaleDateString(wait)}
            </p>
          }
          asChild={false}
        >
          <Attribute className="text-violet-600" Icon={WaitDateIcon} bold>
            {toLocaleTimeago(wait)}
          </Attribute>
        </TooltipWrapper>
      )}

      {until && (
        <TooltipWrapper
          content={
            <p>
              Until:
              <br />
              {toLocaleDateString(until)}
            </p>
          }
          asChild={false}
        >
          <Attribute className="text-orange-600" Icon={UntilDateIcon} bold>
            {toLocaleTimeago(until)}
          </Attribute>
        </TooltipWrapper>
      )}

      {urgency !== 0 && (
        <TooltipWrapper content={<p>Urgency</p>} asChild={false}>
          <Attribute Icon={UrgencyIcon}>{round(urgency, 2)}</Attribute>
        </TooltipWrapper>
      )}
    </>
  );
}

function TaskItem({ task, selected, onSelect }: TaskItemProps) {
  const { description, favorite, status, modified } = task;
  const checked = status === TaskStatus.COMPLETED;

  const actions = [
    {
      Icon: Edit3Icon,
      tooltip: "Modify task",
      onClick: () => null,
      className: "opacity-0 group-hover:opacity-100",
    },
    {
      Icon: DiamondPlusIcon,
      tooltip: "Add a child task",
      onClick: () => null,
      className: "opacity-0 group-hover:opacity-100",
    },
    {
      Icon: CopyIcon,
      tooltip: "Duplicate task",
      onClick: () => null,
      className: "opacity-0 group-hover:opacity-100",
    },
    {
      Icon: Trash2Icon,
      tooltip: "Delete task",
      onClick: () => null,
      className: "opacity-0 hover:text-destructive group-hover:opacity-100",
    },
    {
      Icon: favorite ? StarFilledIcon : StarIcon,
      tooltip: favorite ? "Remove from favorites" : "Add to favorites",
      onClick: () => null,
      className:
        "opacity-0 hover:text-amber-500 group-hover:opacity-100 group-data-[favorite=true]:text-amber-500 group-data-[favorite=true]:opacity-100",
    },
  ];

  return (
    <div
      className="group relative flex gap-2.5 py-3 pe-3 ps-5 hover:bg-muted/50 data-[state=selected]:bg-muted data-[state=selected]:ring-1 data-[state=selected]:ring-inset data-[state=selected]:ring-primary/50"
      data-checked={checked}
      data-state={selected ? "selected" : ""}
      data-favorite={favorite}
      onClick={onSelect}
    >
      {/* LEFT */}
      <Checkbox
        className="size-5 rounded-full data-[state=unchecked]:border-muted-foreground/75"
        checked={checked}
        onClick={(event) => {
          event.stopPropagation();
        }}
      />

      {/* CENTER */}
      <div className="flex flex-1 flex-col">
        <label className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium">{description}</label>

        <div className="flex items-center gap-2 text-ellipsis whitespace-nowrap group-hover:overflow-clip">
          <AttributeList task={task} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex min-w-0 flex-col flex-nowrap items-end">
        <span className="text-[0.8rem] text-muted-foreground group-hover:opacity-0 group-data-[state=selected]:text-foreground">
          {toLocaleTimeago(modified, true)}
        </span>

        <ActionButtons variant="plain" actions={actions} />
      </div>

      {selected && <div className="absolute inset-y-0 left-0 w-2.5 bg-primary" />}
    </div>
  );
}

function NewTaskComponent({ onClick }) {
  return (
    <button className="group mb-6 flex w-full items-center gap-2.5 py-3 pe-3 ps-5" type="button" onClick={onClick}>
      <PlusIcon className="size-5 shrink-0 rounded-full group-hover:bg-primary group-hover:text-primary-foreground" />
      <span className="whitespace-nowrap text-sm text-muted-foreground/50 group-hover:text-primary">
        Add a new task
      </span>
    </button>
  );
}

function TaskList({ groupedTasks, selectedTaskUuid, onTaskSelect }: TaskListProps) {
  return (
    <ScrollArea
      className={cn(
        "flex-container flex-1 flex-col",

        // The Group component utilizes shadcn's Collapsible, which is composed of nested div elements.
        // One of the parent divs has a display style of "table", which must be overidden to somehow
        // restrict the max-width. Unfortunately, we cannot modify the source code of Collapsible,
        // as it acts as an alias for a Radix UI component; nor can we apply a className to the
        // Collapsible component, since it would only affect the innermost div.
        // That's why we use the following hack:
        "[&>div>div]:!block",
      )}
    >
      <GroupList>
        {groupedTasks.map((group, index) => (
          <Group key={index} name={group.name} badge={group.tasks.length}>
            <div className="divide-y">
              {group.tasks.map((task, index) => {
                const selected = task.uuid === selectedTaskUuid;
                return (
                  <TaskItem
                    key={index}
                    task={task}
                    selected={selected}
                    onSelect={() => onTaskSelect(selected ? null : task.uuid)}
                  />
                );
              })}

              <NewTaskComponent />
            </div>
          </Group>
        ))}
      </GroupList>

      <div className="h-24" />
    </ScrollArea>
  );
}

export { TaskList };
