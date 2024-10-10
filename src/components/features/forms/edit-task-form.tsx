import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ButtonList } from "@/components/utils/button-utils";
import { Task, taskSchema } from "@/lib/types/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  description: taskSchema.shape.description,
  status: taskSchema.shape.status,
});

interface EditTaskFormProps {
  task: Task;
}

function EditTaskForm({ task }: EditTaskFormProps) {
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
        <ScrollArea>
          <div className="flex-container flex-col space-y-6 px-3">
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
                    <Input placeholder="Enter a description…" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="h-24" />
        </ScrollArea>

        <ButtonList className="mx-3 mb-3" orientation="vertical">
          <Button type="submit" disabled={!form.formState.isDirty}>
            Save
          </Button>
        </ButtonList>
      </form>
    </Form>
  );
}

export { EditTaskForm };
