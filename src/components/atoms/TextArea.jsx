import classNames from "classnames";
import { forwardRef } from "react";
import HelpText from "./HelpText";

const TextArea = forwardRef(function (
  {
    className,
    name,
    value,
    rows,
    placeholder,
    helpText,
    autoFocus,
    isRequired,
    isDisabled,
    onChange,
    onFocus,
  },
  ref,
) {
  return (
    <>
      <textarea
        ref={ref}
        className={classNames(
          "block w-full rounded-md border bg-neutral-50 p-2.5 text-sm text-neutral-900",
          "focus:bg-white focus:outline focus:outline-2 focus:outline-blue-600",
          "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400",
          className,
        )}
        name={name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={isDisabled}
        required={isRequired}
        onChange={onChange}
        onFocus={onFocus}
      />

      {helpText && <HelpText>{helpText}</HelpText>}
    </>
  );
});

export default TextArea;
