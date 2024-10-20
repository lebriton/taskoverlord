import FlexLine from "../custom/flex-line";
import { TypographyH3 } from "../custom/typography";
import { TaskList } from "../features/task-list";
import { ActionBar } from "@/components/custom/action-bar";
import { useGlobalState } from "@/contexts/global-state";
import { commands } from "@/lib/ipc";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowUpDownIcon,
  EyeIcon,
  EyeOffIcon,
  GroupIcon,
  ListFilterIcon,
  PlusIcon,
  RotateCwIcon,
  SearchIcon,
} from "lucide-react";
import React from "react";
import Pluralize from "react-pluralize";

interface HeaderProps {
  taskCount: number;
  groupCount: number;
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

function Header({ taskCount, groupCount }: HeaderProps) {
  return (
    <FlexLine
      className="items-start border-b-2 bg-muted/75 px-5 pb-3 pt-1.5"
      start={
        <div className="flex flex-col">
          <TypographyH3>Tasks</TypographyH3>
          <p className="text-sm text-muted-foreground">
            <Pluralize singular={"group"} count={taskCount} />, <Pluralize singular={"task"} count={groupCount} />
          </p>
        </div>
      }
    />
  );
}

export default function PrimaryContent() {
  const { selectedTaskUuid, selectTask } = useGlobalState();

  const queryClient = useQueryClient();
  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const tasks = await commands.getTasks();
      return [{ name: null, tasks }];
    },
  });

  const [showCompletedTasks, setShowCompletedTasks] = React.useState<boolean>(false);

  const actions = [
    {
      Icon: PlusIcon,
      tooltip: "New task",
      onClick: () => null,
    },
    {
      Icon: RotateCwIcon,
      tooltip: "Refresh",
      onClick: () =>
        queryClient.invalidateQueries({
          // Invalidate any queries with a queryKey that starts with ["task", ...] or ["tasks", ...]
          predicate: ({ queryKey }) => {
            return Array.isArray(queryKey) && ["task", "tasks"].includes(queryKey[0]);
          },
        }),
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
      Icon: showCompletedTasks ? EyeIcon : EyeOffIcon,
      tooltip: showCompletedTasks ? "Hide completed tasks" : "Show completed tasks",
      onClick: () => setShowCompletedTasks(!showCompletedTasks),
    },
  ];

  return (
    <div className="flex-container h-full flex-col">
      <Header taskCount={-1} groupCount={-1} />

      <ActionBar className="border-b" tabs={tabs} actions={actions} />

      {tasksQuery.isFetching ? (
        "todo loading"
      ) : (
        <TaskList groupedTasks={tasksQuery.data} selectedTaskUuid={selectedTaskUuid} onTaskSelect={selectTask} />
      )}
    </div>
  );
}
