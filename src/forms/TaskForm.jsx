import Button from "../components/atoms/Button";
import FormGroup from "../components/atoms/FormGroup";
import Input from "../components/atoms/Input";
import Label from "../components/atoms/Label";
import { CardBody, CardFooter, CardHeader } from "../components/molecules/Card";
import DropdownCard, {
  DropdownCardHeader,
} from "../components/molecules/DropdownCard";
import { atMostXDecimalPoints, displayPriority, displayTags } from "../utils";
import { useFormikContext, FormikProvider, useFormik } from "formik";

function Provider({ className, extraInitialValues, onSubmit, children }) {
  const formik = useFormik({
    initialValues: {
      ...extraInitialValues,
    },
    onSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <form className={className} onSubmit={formik.handleSubmit}>
        {typeof children === "function" ? children(formik) : children}
      </form>
    </FormikProvider>
  );
}

function Component({ task, softStyle = false }) {
  const formik = useFormikContext();

  return (
    <>
      <FormGroup>
        <EditButtonWrapper
          dropdown={({ onClose }) => (
            <DropdownCard className="!w-[22.5rem]">
              <DropdownCardHeader label="Set the priority" onClose={onClose} />
              <CardBody>wip</CardBody>
            </DropdownCard>
          )}
        >
          <Label
            className={softStyle && "!text-neutral-600"}
            text="Priority"
            isOptional={!softStyle}
          />
        </EditButtonWrapper>
        {(task?.priority && displayPriority(task?.priority)) || (
          <TextValue>No priority yet</TextValue>
        )}
      </FormGroup>

      <hr className="my-3" />

      <FormGroup>
        <EditButtonWrapper
          dropdown={({ onClose }) => (
            <DropdownCard className="!w-[22.5rem]">
              <DropdownCardHeader
                label="Apply tags to this task"
                onClose={onClose}
              />
              <CardBody>
                <Input className="my-1.5" autoFocus />
              </CardBody>
              <CardFooter>wip: display tags</CardFooter>
            </DropdownCard>
          )}
        >
          <Label
            className={softStyle && "!text-neutral-600"}
            text="Tags"
            isOptional={!softStyle}
          />
        </EditButtonWrapper>
        {(task && task.tags && displayTags(task.tags)) || (
          <TextValue>No tags yet</TextValue>
        )}
      </FormGroup>

      <hr className="my-3" />

      <FormGroup>
        <EditButtonWrapper
          dropdown={({ onClose }) => (
            <DropdownCard className="!w-[22.5rem]">
              <DropdownCardHeader
                label="Associate this task with a project"
                onClose={onClose}
              />
              <CardBody>wip</CardBody>
            </DropdownCard>
          )}
        >
          <Label
            className={softStyle && "!text-neutral-600"}
            text="Project"
            isOptional={!softStyle}
          />
        </EditButtonWrapper>
        <TextValue>{task?.project || "No project yet"}</TextValue>
      </FormGroup>

      <hr className="my-3" />

      <FormGroup>
        <EditButtonWrapper
          dropdown={({ onClose }) => (
            <DropdownCard className="!w-[22.5rem]">
              <DropdownCardHeader label="Select a due date" onClose={onClose} />
              <CardBody>wip</CardBody>
            </DropdownCard>
          )}
        >
          <Label
            className={softStyle && "!text-neutral-600"}
            text="Due"
            isOptional={!softStyle}
          />
        </EditButtonWrapper>
        <TextValue>{task?.due || "No due date yet"}</TextValue>
      </FormGroup>

      <hr className="my-3" />

      <FormGroup>
        <EditButtonWrapper
          dropdown={({ onClose }) => (
            <DropdownCard className="!w-[22.5rem]">
              <DropdownCardHeader
                label="Select a wait date"
                onClose={onClose}
              />
              <CardBody>wip</CardBody>
            </DropdownCard>
          )}
        >
          <Label
            className={softStyle && "!text-neutral-600"}
            text="Wait until"
            isOptional={!softStyle}
          />
        </EditButtonWrapper>
        <TextValue>{task?.wait || "No wait date yet"}</TextValue>
      </FormGroup>
    </>
  );
}

function EditButtonWrapper({ children, dropdown, onEdit }) {
  return (
    <div className="flex items-center justify-between">
      {children}
      <Button variant="plain" dropdown={dropdown} onClick={onEdit}>
        Edit
      </Button>
    </div>
  );
}

function TextValue({ children }) {
  return <span className="text-sm">{children}</span>;
}

const TaskForm = {
  Component,
  Provider,
};
export default TaskForm;
