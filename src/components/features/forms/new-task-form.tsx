import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { ActionButtons, ButtonList } from "../../utils/button-utils";
import { DueDateIcon, ScheduledDateIcon, UntilDateIcon, WaitDateIcon } from "../../utils/icon-utils";

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

function NewTaskForm() {
  return (
    <form className="flex flex-col gap-3">
      <Input placeholder="Enter a new task…" />

      <div className="flex items-center justify-between">
        <ActionButtons variant="plain" actions={actions} />

        <Button size="default" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}

export { NewTaskForm };
