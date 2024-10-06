import FlexLine from "../custom/flex-line";
import { TypographyH3 } from "../custom/typography";
import CalendarStripe from "../features/calendar-stripe";
import { TaskList } from "../features/task-list";
import { ActionBar } from "@/components/custom/action-bar";
import { getTasks } from "@/lib/ipc";
import { TaskGroup } from "@/lib/types/task";
import { getTotalTaskCount } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpDownIcon, EyeIcon, GroupIcon, ListFilterIcon, PlusIcon, SearchIcon } from "lucide-react";
import * as React from "react";

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
      className="items-start bg-muted/75 px-5 pb-3 pt-1.5"
      start={
        <div className="flex flex-col">
          <TypographyH3>Tasks</TypographyH3>
          <p className="text-sm text-muted-foreground">
            {groupedTasks.length} groups, {getTotalTaskCount(groupedTasks)} tasks
          </p>
        </div>
      }
    />
  );
}

export default function PrimaryContent() {
  const tasksQuery = useQuery({ queryKey: ["tasks"], queryFn: getTasks });
  // TODO:
  const groupedTasks = [
    { name: "Ungrouped", tasks: tasksQuery.data || [] },
    { name: "Ungrouped", tasks: tasksQuery.data || [] },
  ];

  const [selectedTaskUuid, setSelectedTaskUuid] = React.useState<string | null>(null);

  const handleTaskSelect = (uuid: string | null) => {
    setSelectedTaskUuid(uuid);
  };

  return (
    <div className="flex-container flex-col">
      <CalendarStripe />

      <Header groupedTasks={groupedTasks} />

      <ActionBar className="mb-3" tabs={tabs} actions={actions} />

      <TaskList groupedTasks={groupedTasks} selectedTaskUuid={selectedTaskUuid} onTaskSelect={handleTaskSelect} />
    </div>
  );
}
