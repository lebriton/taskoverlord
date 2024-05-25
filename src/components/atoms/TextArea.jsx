import classNames from "classnames";

export default function TextArea({
  className,
  value,
  rows,
  placeholder,
  helpText,
  autoFocus,
  isRequired,
  isDisabled,
  onChange,
}) {
  return (
    <>
      <textarea
        className={classNames(
          "block w-full rounded-md border bg-neutral-50 p-2.5 text-sm text-neutral-900",
          "focus:bg-white focus:outline focus:outline-2 focus:outline-blue-600",
          "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400",
          className,
        )}
        value={value}
        rows={rows}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={isDisabled}
        required={isRequired}
        onChange={onChange}
      />

      {helpText && <p className="mt-2 text-sm text-neutral-500">{helpText}</p>}
    </>
  );
}
