import { TypographyH2 } from "../custom/typography";
import CalendarStripe from "../features/calendar-stripe";
import { TaskList } from "../features/task-list";
import { ActionBar } from "@/components/custom/action-bar";
import { getTasks } from "@/lib/ipc";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpDownIcon, EyeIcon, GroupIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import * as React from "react";

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

const iconButtonActions = [
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

const textButtonActions = [
  {
    label: "New task",
    onClick: () => null,
  },
];

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

      <div className="mt-3 pe-3 ps-5">
        <TypographyH2>Tasks</TypographyH2>
      </div>

      <ActionBar
        className="mb-3"
        tabs={tabs}
        iconButtonActions={iconButtonActions}
        textButtonActions={textButtonActions}
      />

      <TaskList groupedTasks={groupedTasks} selectedTaskUuid={selectedTaskUuid} onTaskSelect={handleTaskSelect} />
    </div>
  );
}
