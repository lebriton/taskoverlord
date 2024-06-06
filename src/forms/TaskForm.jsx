import Button from "../components/atoms/Button";
import FormGroup from "../components/atoms/FormGroup";
import Label from "../components/atoms/Label";
import { atMostXDecimalPoints, displayPriority, displayTags } from "../utils";

export default function TaskForm({ task, softStyle = false }) {
  return (
    <>
      <FormGroup>
        <EditButtonWrapper>
          <Label className={softStyle && "!text-neutral-600"} text="Priority" />
        </EditButtonWrapper>
        {(task?.priority && displayPriority(task?.priority)) || (
          <TextValue>No priority yet</TextValue>
        )}
      </FormGroup>

      <hr className="my-3" />

      <FormGroup>
        <EditButtonWrapper>
          <Label className={softStyle && "!text-neutral-600"} text="Tags" />
        </EditButtonWrapper>
        {(task && task.tags && displayTags(task.tags)) || (
          <TextValue>No tags yet</TextValue>
        )}
      </FormGroup>

      <hr className="my-3" />

      <FormGroup>
        <EditButtonWrapper>
          <Label className={softStyle && "!text-neutral-600"} text="Project" />
        </EditButtonWrapper>
        <TextValue>{task?.project || "No project yet"}</TextValue>
      </FormGroup>

      <hr className="my-3" />

      <FormGroup>
        <EditButtonWrapper>
          <Label className={softStyle && "!text-neutral-600"} text="Due" />
        </EditButtonWrapper>
        <TextValue>{task?.due || "No due date yet"}</TextValue>
      </FormGroup>

      <hr className="my-3" />

      <FormGroup>
        <EditButtonWrapper>
          <Label className={softStyle && "!text-neutral-600"} text="Wait" />
        </EditButtonWrapper>
        <TextValue>{task?.wait || "No wait date yet"}</TextValue>
      </FormGroup>
    </>
  );
}

function EditButtonWrapper({ children, onEdit }) {
  return (
    <div className="flex items-center justify-between">
      {children}
      <Button variant="plain" onClick={onEdit}>
        Edit
      </Button>
    </div>
  );
}

function TextValue({ children }) {
  return <span className="text-sm">{children}</span>;
}
