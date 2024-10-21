import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { ActionButtons } from "../../utils/button-utils";
import { DueDateIcon, ScheduledDateIcon, UntilDateIcon, WaitDateIcon } from "../../utils/icon-utils";
import { Form, FormField } from "@/components/ui/form";
import { useGlobalState } from "@/contexts/global-state";
import { commands } from "@/lib/ipc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const actions = [
  {
    Icon: DueDateIcon,
    tooltip: "Add a due date",
    onClick: () => null,
    className: "hover:text-primary",
  },
  {
    Icon: ScheduledDateIcon,
    tooltip: "Add a scheduled date",
    onClick: () => null,
    className: "hover:text-primary",
  },
  {
    Icon: WaitDateIcon,
    tooltip: "Add a wait date",
    onClick: () => null,
    className: "hover:text-primary",
  },
  {
    Icon: UntilDateIcon,
    tooltip: "Add an until date",
    onClick: () => null,
    className: "hover:text-primary",
  },
];

const formSchema = z.object({
  raw_string: z.string().min(1),
});

function NewTaskForm() {
  const { selectTask } = useGlobalState();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: commands.addTask,
    onError: (e) => {
      console.error(e);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      raw_string: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(
      values.raw_string,

      {
        onSuccess: (new_task) => {
          form.reset();
          selectTask(new_task.uuid);
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="raw_string"
          render={({ field }) => <Input placeholder="Enter a new task…" autoFocus {...field} />}
        />

        <div className="flex items-center justify-between">
          <ActionButtons variant="plain" actions={actions} />

          <Button type="submit" disabled={mutation.isPending || !form.formState.isDirty}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { NewTaskForm };
