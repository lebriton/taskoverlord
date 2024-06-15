import { CheckIcon } from "@heroicons/react/16/solid";

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
      <label className="relative flex cursor-pointer items-center gap-2 text-sm">
        <input
          name={name}
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          className="peer h-4 w-4 cursor-pointer appearance-none border-2 border-neutral-800 checked:border-none checked:bg-blue-600"
        />
        <CheckIcon className="pointer-events-none absolute hidden h-4 w-4 select-none text-white peer-checked:block" />

        {label && <span className={className}>{label}</span>}
      </label>

      {helpText && <p className="mt-2 text-sm text-neutral-500">{helpText}</p>}
    </>
  );
}
