import { CheckIcon } from "@heroicons/react/16/solid";

export default function Checkbox({ className, label, checked, onChange }) {
  return (
    <label className="relative flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer h-4 w-4 appearance-none border-2 border-neutral-800 checked:border-none checked:bg-blue-600"
      />
      <CheckIcon className="pointer-events-none absolute hidden h-4 w-4 select-none text-white peer-checked:block" />

      {label && <span className={className}>{label}</span>}
    </label>
  );
}
