import { EmptyState } from "@/components/custom/empty-state";
import FlexLine from "@/components/custom/flex-line";
import { SkeletonForm } from "@/components/custom/skeleton/form-skeleton";
import { EditTaskForm } from "@/components/features/forms/edit-task-form";
import { ActionButtons } from "@/components/utils/button-utils";
import { useGlobalState } from "@/contexts/global-state";
import { getTask } from "@/lib/ipc";
import { Task } from "@/lib/types/task";
import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon, ChevronUpIcon, EllipsisIcon, XIcon } from "lucide-react";

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

  const startActions = [];
  const endActions = [
    {
      Icon: XIcon,
      tooltip: "Close",
      onClick: () => null,
    },
  ];

  if (selectedTask) {
    startActions.push(
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
    );

    endActions.unshift({
      Icon: EllipsisIcon,
      tooltip: "More actions…",
      onClick: () => null,
    });
  }

  return (
    <div className="flex-container size-full flex-col bg-muted/40">
      <FlexLine
        className="px-3 py-1.5"
        start={<ActionButtons actions={startActions} />}
        end={<ActionButtons actions={endActions} />}
      />

      {selectedTask ? (
        // A key prop is used to force a remount of the component
        <EditTaskForm key={selectedTask.uuid} task={selectedTask} />
      ) : (
        <div className="size-full px-3 pb-1.5">
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
