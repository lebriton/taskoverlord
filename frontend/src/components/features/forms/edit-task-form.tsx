import { GroupList } from "@/components/custom/group";
import { DatePicker } from "@/components/ui/date-picker";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormGroup, FormItemWrapper, PlainInput } from "@/components/utils/form-utils";
import { Task } from "@/lib/ipc";
import { toLocaleDateString } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// TODO: find a way to generate this from ipc types
const formSchema = z.object({
  // description: taskSchema.shape.description,
  // status: taskSchema.shape.status,
  // due: taskSchema.shape.due,
  // scheduled: taskSchema.shape.scheduled,
  // wait: taskSchema.shape.wait,
  // until: taskSchema.shape.until,
});

interface EditTaskFormProps {
  task: Task;
}

function EditTaskForm({ task }: EditTaskFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...task },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-container flex flex-1 flex-col gap-3">
        <GroupList>
          <FormGroup name="Description">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItemWrapper>
                  <Input placeholder="Enter a description…" autoFocus {...field} />
                </FormItemWrapper>
              )}
            />
          </FormGroup>

          <FormGroup name="Action">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItemWrapper label="Status">
                  <Input placeholder="Enter a description…" {...field} />
                </FormItemWrapper>
              )}
            />
            <FormItemWrapper label="ID">
              <PlainInput value={task.id} />
            </FormItemWrapper>
            <FormItemWrapper label="UUID">
              <PlainInput value={task.uuid} />
            </FormItemWrapper>
          </FormGroup>

          <FormGroup name="Dates">
            <FormField
              control={form.control}
              name="due"
              render={({ field }) => (
                <FormItemWrapper label="Due">
                  <DatePicker {...field} />
                </FormItemWrapper>
              )}
            />
            <FormField
              control={form.control}
              name="scheduled"
              render={({ field }) => (
                <FormItemWrapper label="Scheduled">
                  <DatePicker {...field} />
                </FormItemWrapper>
              )}
            />
            <FormField
              control={form.control}
              name="wait"
              render={({ field }) => (
                <FormItemWrapper label="Wait">
                  <DatePicker {...field} />
                </FormItemWrapper>
              )}
            />
            <FormField
              control={form.control}
              name="until"
              render={({ field }) => (
                <FormItemWrapper label="Until">
                  <DatePicker {...field} />
                </FormItemWrapper>
              )}
            />
            <FormItemWrapper label="Entry">
              <PlainInput value={toLocaleDateString(task.entry)} />
            </FormItemWrapper>
            <FormItemWrapper label="Modified">
              <PlainInput value={toLocaleDateString(task.modified)} />
            </FormItemWrapper>
          </FormGroup>
        </GroupList>
      </form>
    </Form>
  );
}

export { EditTaskForm };
