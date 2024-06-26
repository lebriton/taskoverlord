import classNames from "classnames";
import Button from "../atoms/Button";
import { forwardRef } from "react";
import HelpText from "./HelpText";

const Input = forwardRef(function Input(
  {
    className,
    name,
    size = "sm",
    value,
    placeholder,
    Icon,
    buttonChildren,
    helpText,
    autoFocus,
    isRequired,
    isDisabled,
    isLoading,
    onChange,
    onSubmit,
  },
  ref,
) {
  return (
    <>
      <div className="relative w-full">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            <Icon className="h-4 w-4 text-neutral-500" />
          </div>
        )}

        <input
          className={classNames(
            "w-full rounded-md border bg-neutral-50 px-2.5 py-1.5 text-neutral-900 placeholder-neutral-400",
            "focus:bg-white focus:outline focus:outline-2 focus:outline-blue-600",
            "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400",
            size == "sm" && "text-sm",
            size == "md" && "text-md",
            Icon && "!ps-10",
            buttonChildren && "!p-3",
            className,
          )}
          name={name}
          type="text"
          value={value}
          placeholder={placeholder}
          autoFocus={autoFocus}
          disabled={isDisabled || isLoading}
          required={isRequired}
          onChange={onChange}
          onSubmit={onSubmit}
          ref={ref}
        />

        {buttonChildren && (
          <div
            className={classNames(
              "absolute inset-y-0 flex items-center",
              size == "sm" && "end-1.5",
              size == "md" && "end-2",
            )}
          >
            <Button
              variant="gray"
              size={size == "sm" ? "xs" : "sm"}
              isDisabled={value.length === 0}
              isLoading={isLoading}
              onClick={onSubmit}
            >
              {buttonChildren}
            </Button>
          </div>
        )}
      </div>

      {helpText && <HelpText>{helpText}</HelpText>}
    </>
  );
});

export default Input;
