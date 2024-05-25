import { XMarkIcon } from "@heroicons/react/20/solid";
import Button, { ButtonList } from "../atoms/Button";
import Card, { CardBody, CardFooter, CardHeader } from "../molecules/Card";
import FlexLine from "../molecules/FlexLine";
import Heading2 from "../molecules/Heading2";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import FormGroup from "../atoms/FormGroup";
import TextArea from "../atoms/TextArea";
import TaskForm from "../../forms/TaskForm";

export default function NewTask({ onSubmit, onClose }) {
  return (
    <Card className="h-full" hasExternalBorder={false}>
      <CardHeader>
        <FlexLine
          left={
            /* NB: !mb-px to align borders */
            <Heading2 className="!mb-px" title={"New task"} />
          }
          right={<Button variant="plain" Icon={XMarkIcon} onClick={onClose} />}
        />
      </CardHeader>

      <CardBody className="h-full overflow-scroll">
        <FormGroup>
          <Label text="Add a description" />
          <TextArea rows={2} autoFocus isRequired />
        </FormGroup>

        <hr className="my-3" />

        <TaskForm />
      </CardBody>

      <CardFooter>
        <div className="flex justify-end">
          <ButtonList>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="blue" onClick={onSubmit}>
              Add task
            </Button>
          </ButtonList>
        </div>
      </CardFooter>
    </Card>
  );
}
