import { ButtonList } from "../utils/button-utils";
import { TypographyH3 } from "@/components/custom/typography";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TooltipWrapper } from "@/components/utils/tooltip-utils";
import { Task, TaskGroup, TaskStatus } from "@/lib/types/task";
import { cn, toLocaleTimeago, toLocaleDateString } from "@/lib/utils";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import {
  AlarmClockIcon,
  CalendarClockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockAlertIcon,
  HourglassIcon,
  MessageSquareIcon,
  SquarePenIcon,
  Trash2Icon,
} from "lucide-react";
import React, { PropsWithChildren } from "react";
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
}

interface TaskListProps {
  groupedTasks: TaskGroup[];
  selectedTaskUuid: string | null;
  onTaskSelect: (uuid: string | null) => void;
}

interface GroupProps {
  name: string;
}

function TaskItem({ task, selected, onSelect }: TaskItemProps) {
  const { description, favorite, status, annotations, due, scheduled, wait, until, modified, urgency } = task;
  const checked = status === TaskStatus.COMPLETED;

  return (
    <div
      className="group flex cursor-pointer items-start gap-2 py-2 pe-3 ps-6 hover:!bg-muted/50 data-[checked=true]:bg-muted/25 data-[favorite=true]:bg-amber-50/75 data-[state=selected]:!bg-muted"
      data-checked={checked}
      data-state={selected ? "selected" : ""}
      data-favorite={favorite}
      onClick={onSelect}
    >
      <Checkbox
        className="mt-0.5 size-5 rounded-full"
        checked={checked}
        onClick={(event) => {
          event.stopPropagation();
        }}
      />

      {/* Center section */}
      <div className="flex min-w-0 flex-1 flex-col flex-nowrap gap-0.5">
        {/* 1st row */}
        <div className="flex min-w-0 items-center gap-2">
          <label className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium group-data-[checked=true]:opacity-70">
            {description}
          </label>

          <EditButton />
        </div>

        {/* 2nd row */}
        <div className="flex min-w-0 items-center gap-2.5 text-ellipsis whitespace-nowrap group-hover:overflow-clip">
          {annotations && (
            <TooltipWrapper
              content={
                <p>
                  <Pluralize singular={"annotation"} count={annotations.length} />
                </p>
              }
              asChild={false}
            >
              <Attribute Icon={MessageSquareIcon}>{annotations.length}</Attribute>
            </TooltipWrapper>
          )}

          <TooltipWrapper content={<p>Modified: {toLocaleDateString(modified)}</p>} asChild={false}>
            <Attribute className="font-normal">{toLocaleTimeago(modified, true)}</Attribute>
          </TooltipWrapper>

          {due && (
            <TooltipWrapper content={<p>Due: {toLocaleDateString(due)}</p>} asChild={false}>
              <Attribute className="text-yellow-600" Icon={CalendarClockIcon}>
                {toLocaleTimeago(due)}
              </Attribute>
            </TooltipWrapper>
          )}

          {scheduled && (
            <TooltipWrapper content={<p>Scheduled: {toLocaleDateString(scheduled)}</p>} asChild={false}>
              <Attribute className="text-lime-600" Icon={AlarmClockIcon}>
                {toLocaleTimeago(scheduled)}
              </Attribute>
            </TooltipWrapper>
          )}

          {wait && (
            <TooltipWrapper content={<p>Wait: {toLocaleDateString(wait)}</p>} asChild={false}>
              <Attribute className="text-violet-600" Icon={HourglassIcon}>
                {toLocaleTimeago(wait)}
              </Attribute>
            </TooltipWrapper>
          )}

          {until && (
            <TooltipWrapper content={<p>Until: {toLocaleDateString(until)}</p>} asChild={false}>
              <Attribute className="text-orange-600" Icon={ClockAlertIcon}>
                {toLocaleTimeago(until)}
              </Attribute>
            </TooltipWrapper>
          )}
        </div>
      </div>

      {/* End section */}
      <div className="flex min-w-0 flex-col flex-nowrap items-end gap-0.5">
        <ButtonList>
          <ButtonList size="xs">
            <DeleteButton />
          </ButtonList>

          <AddToFavoriteButton favorite={favorite} />
        </ButtonList>

        {urgency != 0 && <span className="me-1 text-[0.8rem] font-light group-hover:opacity-0">{urgency}</span>}
      </div>
    </div>
  );
}

function Attribute({ className, Icon, children }: PropsWithChildren<AttributeProps>) {
  return (
    <div className={cn("flex items-center gap-0.5 text-[0.8rem] font-medium text-muted-foreground", className)}>
      {Icon && <Icon className="mb-0.5 size-3 shrink-0" />}
      <div className="first-letter:uppercase">{children}</div>
    </div>
  );
}

function EditButton() {
  return (
    <TooltipWrapper content={<p>Modify</p>}>
      <Button
        className="shrink-0 opacity-0 group-hover:opacity-100"
        variant="outline"
        size="icon_xs"
        onClick={(e) => e.stopPropagation()}
      >
        <SquarePenIcon className="size-4" />
      </Button>
    </TooltipWrapper>
  );
}

function DeleteButton() {
  return (
    <TooltipWrapper content={<p>Delete task</p>}>
      <Button
        className="shrink-0 opacity-0 hover:text-rose-600 group-hover:opacity-100"
        variant="outline"
        size="icon_xs"
        onClick={(e) => e.stopPropagation()}
      >
        <Trash2Icon className="size-4" />
      </Button>
    </TooltipWrapper>
  );
}

function AddToFavoriteButton({ favorite }) {
  return (
    <TooltipWrapper content={<p>{favorite ? "Remove from favorites" : "Add to favorites"}</p>}>
      <Button
        className="shrink-0 opacity-0 hover:text-amber-500 group-hover:opacity-100 group-data-[favorite=true]:text-amber-500 group-data-[favorite=true]:opacity-100"
        variant="ghost"
        size="icon_xs"
        onClick={(e) => e.stopPropagation()}
      >
        {favorite ? <StarFilledIcon className="size-5" /> : <StarIcon className="size-5" />}
      </Button>
    </TooltipWrapper>
  );
}

function Group({ name, children }: PropsWithChildren<GroupProps>) {
  const [open, setOpen] = React.useState(true);

  const Icon = open ? ChevronDownIcon : ChevronUpIcon;

  return (
    <Collapsible className="max-w-full" open={open} onOpenChange={setOpen}>
      <div className="mt-6 flex items-center gap-1.5 border-b px-3 py-1.5">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon">
            <Icon className="size-7 text-muted-foreground" />
          </Button>
        </CollapsibleTrigger>
        <TypographyH3>
          {name} <span className="text-xl font-medium text-muted-foreground/75">{children.length}</span>
        </TypographyH3>
      </div>

      <CollapsibleContent className="flex flex-col divide-y">{children}</CollapsibleContent>
    </Collapsible>
  );
}

function TaskList({ groupedTasks, selectedTaskUuid, onTaskSelect }: TaskListProps) {
  return (
    <ScrollArea
      className={cn(
        "flex-container flex-col",

        // The Group component utilizes shadcn's Collapsible, which is composed of nested div elements.
        // One of the parent divs has a display style of "table", which must be overidden to somehow
        // restrict the max-width. Unfortunately, we cannot modify the source code of Collapsible,
        // as it acts as an alias for a Radix UI component; nor can we apply a className to the
        // Collapsible component, since it would only affect the innermost div.
        // That's why we use the following hack:
        "[&>div>div]:!block",
      )}
    >
      {groupedTasks.map((group, index) => (
        <Group key={index} name={group.name}>
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
        </Group>
      ))}

      <div className="h-24" />
    </ScrollArea>
  );
}

export { TaskList };
