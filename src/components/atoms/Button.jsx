import classNames from "classnames";
import Shortcut from "./Shortcut";

export default function Button({
  className,
  variant = "default",
  size = "xs",
  Icon,
  shortcutText = "",
  disabled = false,
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(
        "inline-flex items-center justify-center gap-1 rounded-md p-1.5 text-center font-medium enabled:active:brightness-95",
        variant == "no-outline" &&
          "text-neutral-700 enabled:hover:bg-neutral-100",
        variant != "no-outline" && "border",

        variant == "default" && "bg-white enabled:hover:bg-neutral-50",
        variant == "green" &&
          "border-green-700 bg-green-600 text-white enabled:hover:bg-green-700",
        variant == "gray" &&
          "border-neutral-700 bg-neutral-600 text-white enabled:hover:bg-neutral-700",
        variant == "blue" &&
          "border-blue-700 bg-blue-600 text-white enabled:hover:bg-blue-700",

        size == "xs" && "text-xs",
        size == "sm" && "text-sm",

        disabled && "cursor-not-allowed opacity-50",

        children && "px-2.5",

        className,
      )}
      onClick={onClick}
    >
      {shortcutText && <Shortcut className="me-1" text={shortcutText} />}
      {children}
      {Icon && (
        <Icon
          className={classNames(
            "size-4 text-neutral-700",
            ["green", "gray"].includes(variant) && "text-white",
          )}
        />
      )}
    </button>
  );
}

export function ButtonList({ className, children }) {
  return <div className="flex gap-1.5">{children}</div>;
}
