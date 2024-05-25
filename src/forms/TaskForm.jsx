import Button from "../components/atoms/Button";
import FormGroup from "../components/atoms/FormGroup";
import Label from "../components/atoms/Label";
import { atMostXDecimalPoints, displayPriority, displayTags } from "../utils";

export default function TaskForm({ task }) {
  return (
    <>
      <FormGroup>
        <EditButtonWrapper>
          <Label text="Priority" />
        </EditButtonWrapper>
        {(task?.priority && displayPriority(task?.priority)) || (
          <TextValue>No priority</TextValue>
        )}
      </FormGroup>

      <FormGroup>
        <EditButtonWrapper>
          <Label text="Tags" />
        </EditButtonWrapper>
        {(task && task.tags && displayTags(task.tags)) || (
          <TextValue>No tags</TextValue>
        )}
      </FormGroup>

      <FormGroup>
        <EditButtonWrapper>
          <Label text="Project" />
        </EditButtonWrapper>
        <TextValue>{task?.project || "No project"}</TextValue>
      </FormGroup>

      <FormGroup>
        <EditButtonWrapper>
          <Label text="Due" />
        </EditButtonWrapper>
        <TextValue>{task?.due || "No due date"}</TextValue>
      </FormGroup>

      <FormGroup>
        <EditButtonWrapper>
          <Label text="Wait" />
        </EditButtonWrapper>
        <TextValue>{task?.wait || "No wait date"}</TextValue>
      </FormGroup>
    </>
  );
}

function EditButtonWrapper({ children, onEdit }) {
  return (
    <div className="flex items-center justify-between">
      {children}
      <Button variant="no-outline" onClick={onEdit}>
        Edit
      </Button>
    </div>
  );
}

function TextValue({ children }) {
  return <span className="text-sm">{children}</span>;
}
