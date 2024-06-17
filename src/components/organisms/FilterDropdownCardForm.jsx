import { useState, useEffect } from "react";
import Anchor from "../atoms/Anchor";
import Button, { ButtonList } from "../atoms/Button";
import FormGroup from "../atoms/FormGroup";
import Input from "../atoms/Input";
import Label from "../atoms/Label";
import { CardBody, CardFooter } from "../molecules/Card";
import { CheckboxList } from "../molecules/Checkbox";
import DropdownCard, { DropdownCardHeader } from "../molecules/DropdownCard";
import { difference, displayStatusBadge } from "../../utils";

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

export default function FilterDropdownCardForm({ filters, onSubmit, onClose }) {
  const getInitialStatusOptions = () =>
    [
      { label: displayStatusBadge("pending"), value: "pending" },
      { label: displayStatusBadge("waiting"), value: "waiting" },
      { label: displayStatusBadge("in progress"), value: "in progress" },
      { label: displayStatusBadge("completed"), value: "completed" },
      { label: displayStatusBadge("deleted"), value: "deleted" },
    ].map((option) => ({
      ...option,
      isChecked: filters.status.includes(option.value),
    }));
  const [statusOptions, setStatusOptions] = useState(getInitialStatusOptions());

  const handleReset = () => {
    setStatusOptions(getInitialStatusOptions());
  };

  let delta = 0;
  const [temporaryFilters, setTemporaryFilters] = useState(filters);
  useEffect(() => {
    setTemporaryFilters({
      ...temporaryFilters,
      status: statusOptions
        .filter((option) => option.isChecked)
        .map((option) => option.value),
    });
  }, [statusOptions]);
  delta += difference(filters.status, temporaryFilters.status).length;

  return (
    <DropdownCard className="!w-[22.5rem]">
      <DropdownCardHeader
        className="!bg-neutral-50"
        label="Filter"
        onClose={onClose}
      />
      <CardBody className="!pb-0 !pt-3">
        <Group
          label="Status"
          onClear={() =>
            setStatusOptions(
              statusOptions.map((option) => ({ ...option, isChecked: false })),
            )
          }
        >
          <CheckboxList options={statusOptions} onChange={setStatusOptions} />
        </Group>
      </CardBody>
      <CardFooter>
        <ButtonList className="justify-between">
          <Button isDisabled={delta == 0} onClick={handleReset}>
            Reset
          </Button>
          <Button
            variant="blue"
            isDisabled={delta == 0}
            onClick={() => onSubmit(temporaryFilters)}
          >
            Apply
            {/* TODO: pluralize */}
            {delta > 0 && ` (${delta} changes)`}
          </Button>
        </ButtonList>
      </CardFooter>
    </DropdownCard>
  );
}
