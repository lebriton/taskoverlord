import FlexLine from "../custom/flex-line";
import { TypographyH3 } from "../custom/typography";
import { TaskList } from "../features/task-list";
import { ActionBar } from "@/components/custom/action-bar";
import { useGlobalState } from "@/contexts/global-state";
import { TaskGroup } from "@/lib/types/task";
import { getTotalTaskCount } from "@/lib/utils";
import { ArrowUpDownIcon, EyeIcon, GroupIcon, ListFilterIcon, PlusIcon, RotateCwIcon, SearchIcon } from "lucide-react";
import * as React from "react";
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
  {
    Icon: EyeIcon,
    tooltip: "Modify visibility",
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
    <div className="flex-container flex-col">
      <Header groupedTasks={groupedTasks} />

      <ActionBar tabs={tabs} actions={actions} />

      <TaskList groupedTasks={groupedTasks} selectedTaskUuid={selectedTaskUuid} onTaskSelect={selectTask} />
    </div>
  );
}
