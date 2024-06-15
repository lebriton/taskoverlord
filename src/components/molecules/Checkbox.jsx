import { CheckIcon } from "@heroicons/react/16/solid";
import classNames from "classnames";

export default function Checkbox({
  className,
  name,
  label,
  helpText,
  isChecked,
  onChange,
}) {
  return (
    <>
      <label
        className={classNames(
          "relative flex cursor-pointer items-center gap-2 text-sm",
          className,
        )}
      >
        <input
          name={name}
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          className="peer h-4 w-4 cursor-pointer appearance-none border-2 border-neutral-800 checked:border-none checked:bg-blue-600"
        />
        <CheckIcon className="pointer-events-none absolute hidden h-4 w-4 select-none text-white peer-checked:block" />

        {label}
      </label>

      {helpText && <p className="mt-2 text-sm text-neutral-500">{helpText}</p>}
    </>
  );
}

export function CheckboxList({ options, onChange }) {
  return (
    <div className="flex flex-col gap-0.5">
      {options.map((option, idx) => (
        <Checkbox
          key={idx}
          className="-mx-1.5 rounded-sm px-1.5 py-0.5 hover:bg-neutral-100"
          name={option.value}
          label={option.label}
          isChecked={option.isChecked}
          onChange={(e) =>
            onChange(
              options.map((option) => {
                if (option.value == e.target.name)
                  return { ...option, isChecked: !option.isChecked };

                return option;
              }),
            )
          }
        />
      ))}
    </div>
  );
}
