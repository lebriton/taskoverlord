import { ActionBar } from "../custom/action-bar";
import { EmptyState } from "@/components/custom/empty-state";
import { SkeletonForm } from "@/components/custom/skeleton/form-skeleton";
import { EditTaskForm } from "@/components/features/forms/edit-task-form";
import { useGlobalState } from "@/contexts/global-state";
import { getTask } from "@/lib/ipc";
import { Task } from "@/lib/types/task";
import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon, ChevronUpIcon, EllipsisIcon, XIcon } from "lucide-react";

const tabs = [
  {
    label: "Attributes",
    value: "attributes",
  },
  {
    label: "Annotations",
    value: "annotations",
  },
  {
    label: "History",
    value: "history",
  },
];

export default function AuxiliaryBar() {
  const { selectedTaskUuid } = useGlobalState();
  const taskQuery = useQuery({
    queryKey: ["task", selectedTaskUuid],
    queryFn: async () => await getTask({ taskUuid: selectedTaskUuid }),
    enabled: !!selectedTaskUuid,
    staleTime: 0,
  });

  const { isFetching } = taskQuery;
  let selectedTask: Task | null = null;
  if (!isFetching) {
    selectedTask = taskQuery.data || null;
  }

  const actions = [
    {
      Icon: XIcon,
      tooltip: "Close",
      onClick: () => null,
    },
  ];
  if (selectedTask) {
    actions.unshift(
      {
        Icon: ChevronUpIcon,
        tooltip: "Previous task",
        onClick: () => null,
      },
      {
        Icon: ChevronDownIcon,
        tooltip: "Next task",
        onClick: () => null,
      },
      {
        Icon: EllipsisIcon,
        tooltip: "More actions…",
        onClick: () => null,
      },
    );
  }

  return (
    <div className="flex-container size-full flex-col bg-muted/40">
      <ActionBar tabs={tabs} actions={actions} />

      {selectedTask ? (
        // A key prop is used to force a remount of the component
        <EditTaskForm key={selectedTask.uuid} task={selectedTask} />
      ) : (
        <div className="size-full p-3">
          {isFetching ? (
            <SkeletonForm numInputs={5} />
          ) : (
            <EmptyState title="No items selected" subtitle="Pick a task to display and modify its data." />
          )}
        </div>
      )}
    </div>
  );
}
