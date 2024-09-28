import { TaskList } from "../features/task-list";
import { ActionBar } from "@/components/features/action-bar";
import { getTasks } from "@/lib/ipc";
import { Task } from "@/lib/types/task";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpDownIcon, EyeIcon, GroupIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import { Columns3Icon, ListIcon } from "lucide-react";
import * as React from "react";

const actionTabs = [
  {
    label: "Kanban",
    value: "kanban",
    Icon: Columns3Icon,
  },
  {
    label: "List",
    value: "list",
    Icon: ListIcon,
  },
];

const actionActions = [
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

export default function MainContent() {
  const tasksQuery = useQuery({ queryKey: ["tasks"], queryFn: getTasks });
  const groupedTasks = [{ name: "Ungrouped", tasks: tasksQuery.data || [] }];

  const [selectedTaskUuid, setSelectedTaskUuid] = React.useState<string | null>(null);

  const handleTaskSelect = (uuid: string | null) => {
    setSelectedTaskUuid(uuid);
  };
  const handleNewTaskCreate = () => {};

  return (
    <div className="flex max-h-full flex-col">
      <ActionBar tabs={actionTabs} actions={actionActions} onNewTaskCreate={handleNewTaskCreate} />

      <TaskList groupedTasks={groupedTasks} selectedTaskUuid={selectedTaskUuid} onTaskSelect={handleTaskSelect} />
    </div>
  );
}
