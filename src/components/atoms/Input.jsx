import classNames from "classnames";
import Button from "../atoms/Button";
import { forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    className,
    size = "sm",
    value,
    placeholder,
    Icon,
    buttonChildren,
    helpText,
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
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            <Icon className="h-4 w-4 text-neutral-500" />
          </div>
        )}

        <input
          className={classNames(
            "w-full rounded-md border px-3 py-1.5 text-neutral-900 placeholder-neutral-500 focus:outline focus:outline-2 focus:outline-blue-600",
            "disabled:cursor-not-allowed disabled:bg-gray-100",
            size == "sm" && "text-sm",
            size == "lg" && "text-lg",
            Icon && "!ps-10",
            buttonChildren && "!p-3",
            className,
          )}
          type="text"
          value={value}
          placeholder={placeholder}
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
              size == "lg" && "end-2.5",
            )}
          >
            <Button
              variant="gray"
              size="sm"
              isDisabled={value.length === 0}
              isLoading={isLoading}
              onClick={onSubmit}
            >
              {buttonChildren}
            </Button>
          </div>
        )}
      </div>

      {helpText && <p className="mt-2 text-sm text-gray-500">{helpText}</p>}
    </>
  );
});

export default Input;
