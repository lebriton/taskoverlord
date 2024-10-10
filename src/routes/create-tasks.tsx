import { ActionBar } from "@/components/custom/action-bar";
import { NewTaskForm } from "@/components/features/forms/new-task-form";
import { Card, CardContent } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create-tasks")({
  component: CreateTasks,
});

function CreateTasks() {
  return (
    <>
      <ActionBar tabs={[{ label: "Create tasks", value: "create-tasks" }]} />

      <div className="px-2.5">
        <Card>
          <CardContent>
            <NewTaskForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
