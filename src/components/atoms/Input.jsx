import classNames from "classnames";
import Button from "../atoms/Button";
import { forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    className,
    value,
    placeholder,
    Icon,
    buttonText,
    helpText,
    isRequired,
    onSubmit,
  },
  ref,
) {
  return (
    <>
      <div className="relative">
        {Icon && (
          <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            <Icon className="h-4 w-4 text-neutral-500" />
          </div>
        )}

        <input
          className={classNames(
            "w-full rounded-md border px-3 py-1.5 text-sm text-neutral-900 placeholder-neutral-500 focus:outline focus:outline-2 focus:outline-blue-600",
            Icon && "!ps-10",
            buttonText && "!p-3",
            className,
          )}
          type="text"
          value={value}
          placeholder={placeholder}
          required={isRequired}
          onSubmit={onSubmit}
          ref={ref}
        />

        {buttonText && (
          <div className="absolute inset-y-0 end-1.5 flex items-center">
            <Button variant="gray" size="sm" onClick={onSubmit}>
              {buttonText}
            </Button>
          </div>
        )}
      </div>

      {helpText && <p className="mt-2 text-sm text-gray-500">{helpText}</p>}
    </>
  );
});

export default Input;
