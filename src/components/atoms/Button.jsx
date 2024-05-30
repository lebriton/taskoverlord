import classNames from "classnames";
import Shortcut from "./Shortcut";
import Spinner from "./Spinner";

export default function Button({
  className,
  variant = "default",
  size = "xs",
  Icon,
  shortcutText = "",
  isDisabled,
  isLoading,
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      disabled={isDisabled}
      className={classNames(
        "inline-flex items-center gap-1 text-nowrap rounded-md p-1.5 font-medium",
        "disabled:cursor-not-allowed disabled:opacity-50",

        variant == "plain" && "text-neutral-700 enabled:hover:bg-neutral-100",
        variant != "plain" && "border",

        variant == "default" && "bg-white enabled:hover:bg-neutral-50",
        variant == "green" &&
          "border-green-700 bg-green-600 text-white enabled:hover:bg-green-700",
        variant == "gray" &&
          "border-neutral-700 bg-neutral-600 text-white enabled:hover:bg-neutral-700",
        variant == "blue" &&
          "border-blue-700 bg-blue-600 text-white enabled:hover:bg-blue-700",

        size == "xs" && "text-xs",
        size == "sm" && "text-sm",

        children && "px-2.5",

        isLoading && "cursor-default",
        !isLoading && "enabled:active:brightness-95",

        className,
      )}
      onClick={(e) => !isDisabled && !isLoading && onClick(e)}
    >
      {isLoading && (
        <Spinner
          className={classNames(
            "me-3",
            ["green", "gray", "blue"].includes(variant) && "text-white",
          )}
        />
      )}
      {shortcutText && <Shortcut className="me-1" text={shortcutText} />}
      {children}
      {Icon && (
        <Icon
          className={classNames(
            "size-4 text-neutral-700",
            ["green", "gray", "blue"].includes(variant) && "text-white",
          )}
        />
      )}
    </button>
  );
}

export function ButtonList({ className, children }) {
  return <div className="flex gap-1">{children}</div>;
}
