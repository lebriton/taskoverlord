import FlexLine from "../custom/flex-line";
import { SkeletonForm } from "../custom/skeleton/form-skeleton";
import { ScrollArea } from "../ui/scroll-area";
import { ActionButtons, ButtonList } from "../utils/button-utils";
import { EmptyState } from "@/components/custom/empty-state";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGlobalState } from "@/contexts/global-state";
import { getTask } from "@/lib/ipc";
import { Task, taskSchema } from "@/lib/types/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon, ChevronUpIcon, EllipsisIcon, SaveIcon, TrashIcon, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  description: taskSchema.shape.description,
  status: taskSchema.shape.status,
});

interface MyFormProps {
  task: Task;
}

function MyForm({ task }: MyFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: task.description, status: task.status },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-container flex flex-1 flex-col gap-3">
        <ScrollArea className="flex-container flex-1 flex-col px-3 [&>div>div]:space-y-8">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a description…" autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a description…" autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="h-24" />
        </ScrollArea>

        <ButtonList className="mx-3 mb-3" orientation="vertical">
          <Button type="submit" disabled={!form.formState.isDirty}>
            <SaveIcon className="me-1 size-3.5" />
            Save
          </Button>
          <Button variant="destructive">
            <TrashIcon className="me-1 size-3.5" />
            Delete
          </Button>
        </ButtonList>
      </form>
    </Form>
  );
}

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
        <MyForm key={selectedTask.uuid} task={selectedTask} />
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
