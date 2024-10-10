import FlexLine from "../custom/flex-line";
import { TypographyH3 } from "../custom/typography";
import { TaskList } from "../features/task-list";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { ActionButtons, ButtonList } from "../utils/button-utils";
import { DueDateIcon, ScheduledDateIcon, UntilDateIcon, WaitDateIcon } from "../utils/icon-utils";
import { ActionBar } from "@/components/custom/action-bar";
import { useGlobalState } from "@/contexts/global-state";
import { TaskGroup } from "@/lib/types/task";
import { getTotalTaskCount } from "@/lib/utils";
import { ArrowUpDownIcon, GroupIcon, ListFilterIcon, PlusIcon, RotateCwIcon, SearchIcon } from "lucide-react";
import Pluralize from "react-pluralize";

interface HeaderProps {
  groupedTasks: TaskGroup[];
}

const tabs = [
  {
    label: "Kanban",
    value: "kanban",
  },
  {
    label: "List",
    value: "list",
  },
];

const actions = [
  {
    Icon: PlusIcon,
    tooltip: "New task",
    onClick: () => null,
  },
  {
    Icon: RotateCwIcon,
    tooltip: "Refresh",
    onClick: () => null,
  },
  {
    Icon: ListFilterIcon,
    tooltip: "Filter",
    onClick: () => null,
  },
  {
    Icon: ArrowUpDownIcon,
    tooltip: "Sort",
    onClick: () => null,
  },
  {
    Icon: SearchIcon,
    tooltip: "Search",
    onClick: () => null,
  },
  {
    Icon: GroupIcon,
    tooltip: "Group by",
    onClick: () => null,
  },
];

function Header({ groupedTasks }: HeaderProps) {
  return (
    <FlexLine
      className="items-start border-b-2 bg-muted/75 px-5 pb-3 pt-1.5"
      start={
        <div className="flex flex-col">
          <TypographyH3>Tasks</TypographyH3>
          <p className="text-sm text-muted-foreground">
            <Pluralize singular={"group"} count={groupedTasks.length} />,{" "}
            <Pluralize singular={"task"} count={getTotalTaskCount(groupedTasks)} />
          </p>
        </div>
      }
    />
  );
}

export default function PrimaryContent() {
  const { groupedTasks, selectedTaskUuid, selectTask } = useGlobalState();

  return (
    <div className="flex-container h-full flex-col">
      <Header groupedTasks={groupedTasks} />

      <ActionBar className="border-b" tabs={tabs} actions={actions} />

      <div className="border-b py-2.5 pe-3 ps-5">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Show completed tasks
          </label>
        </div>
      </div>

      <TaskList groupedTasks={groupedTasks} selectedTaskUuid={selectedTaskUuid} onTaskSelect={selectTask} />

      <form className="flex flex-col gap-6 border-t bg-muted/25 pb-3 pe-3 ps-3 pt-1.5">
        <Input className="border-none bg-transparent p-0 text-base shadow-none" placeholder="Enter a new task…" />
        <div>
          <div className="flex items-center justify-between">
            <ActionButtons
              variant="plain"
              actions={[
                {
                  Icon: DueDateIcon,
                  tooltip: "Add a due date",
                  onClick: () => null,
                },
                {
                  Icon: ScheduledDateIcon,
                  tooltip: "Add a scheduled date",
                  onClick: () => null,
                },
                {
                  Icon: WaitDateIcon,
                  tooltip: "Add a wait date",
                  onClick: () => null,
                },
                {
                  Icon: UntilDateIcon,
                  tooltip: "Add an until date",
                  onClick: () => null,
                },
              ]}
            />

            <ButtonList>
              <Button variant="outline" size="sm" type="submit">
                Cancel
              </Button>
              <Button size="sm" type="submit">
                Add task
              </Button>
            </ButtonList>
          </div>
        </div>
      </form>
    </div>
  );
}
