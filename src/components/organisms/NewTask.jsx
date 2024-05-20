import { XMarkIcon } from "@heroicons/react/20/solid";
import Button, { ButtonList } from "../atoms/Button";
import Card, { CardBody, CardFooter, CardHeader } from "../molecules/Card";
import FlexLine from "../molecules/FlexLine";
import Heading2 from "../molecules/Heading2";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import FormGroup from "../atoms/FormGroup";
import TextArea from "../atoms/TextArea";

export default function NewTask({ onClose }) {
  return (
    <Card className="h-full" hasExternalBorder={false}>
      <CardHeader>
        <FlexLine
          left={<Heading2 className="!-mb-px" title={"New task"} />}
          right={
            <Button variant="no-outline" Icon={XMarkIcon} onClick={onClose} />
          }
        />
      </CardHeader>

      <CardBody className="h-full overflow-scroll">
        <FormGroup>
          <Label text="Description" />
          <TextArea rows={4} autoFocus isRequired={true} />
        </FormGroup>

        <FormGroup>
          <Label text="Project" isOptional />
          <Input isRequired={false} />
        </FormGroup>

        <FormGroup>
          <Label text="Tags" isOptional />
          <Input isRequired={false} />
        </FormGroup>
      </CardBody>

      <CardFooter>
        <div className="flex justify-end">
          <ButtonList>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="blue">Add task</Button>
          </ButtonList>
        </div>
      </CardFooter>
    </Card>
  );
}
