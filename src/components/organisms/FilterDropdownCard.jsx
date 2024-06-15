import Anchor from "../atoms/Anchor";
import Button, { ButtonList } from "../atoms/Button";
import FormGroup from "../atoms/FormGroup";
import Input from "../atoms/Input";
import Label from "../atoms/Label";
import { CardBody, CardFooter } from "../molecules/Card";
import DropdownCard, { DropdownCardHeader } from "../molecules/DropdownCard";

function Group({ label, onClear, children }) {
  return (
    <FormGroup>
      <div className="flex items-baseline justify-between">
        <Label text={label} />
        <Anchor text="Clear" onClick={onClear} />
      </div>

      {children}
    </FormGroup>
  );
}

export default function FilterDropdownCard({ onClose }) {
  return (
    <DropdownCard className="!w-[22.5rem]">
      <DropdownCardHeader
        className="!bg-neutral-50"
        label="Filter"
        onClose={onClose}
      />
      <CardBody className="!pb-0 !pt-3">
        <Group label="Status">
          <Input />
        </Group>
      </CardBody>
      <CardFooter>
        <ButtonList className="justify-between">
          <Button>Reset</Button>
          <Button variant="blue">Apply</Button>
        </ButtonList>
      </CardFooter>
    </DropdownCard>
  );
}
