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
import HelpText from "../atoms/HelpText";

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
  const [description, setDescription] = useState(filters.description);
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
    setDescription(filters.description);
    setStatusOptions(getInitialStatusOptions());
  };

  const [temporaryFilters, setTemporaryFilters] = useState(filters);
  useEffect(() => {
    setTemporaryFilters({
      ...temporaryFilters,
      description: description,
      status: statusOptions
        .filter((option) => option.isChecked)
        .map((option) => option.value),
    });
  }, [description, statusOptions]);
  const delta = countFilterDifferences(filters, temporaryFilters);

  return (
    <DropdownCard className="!w-[22.5rem]">
      <DropdownCardHeader label="Filters" onClose={onClose} />
      <CardBody className="!pb-0 !pt-3">
        <HelpText className="!mb-2 !mt-0">
          Use these filters to narrow down your search and find the exact task.
        </HelpText>
        <Group label="Description" onClear={() => setDescription("")}>
          <Input
            value={description}
            placeholder="Fuzzy search by description…"
            onChange={(e) => setDescription(e.target.value)}
            autoFocus
          />
        </Group>
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
      <CardFooter className="flex items-center justify-between">
        {/* TODO: pluralize */}
        <span className="text-sm text-neutral-400">
          {countFilters(filters)} filters applied
        </span>
        <ButtonList>
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

export function countFilters(filters) {
  let count = filters.status.length;
  if (filters.description !== "") count++;
  return count;
}

export function countFilterDifferences(a, b) {
  let delta = 0;
  delta += difference(a.status, b.status).length;
  if (a.description != b.description) delta++;
  return delta;
}
