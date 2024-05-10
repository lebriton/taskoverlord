import classNames from "classnames";
import Shortcut from "./Shortcut";

export default function Button({
  className,
  variant = "default",
  Icon,
  shortcutText = "",
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      className={classNames(
        "inline-flex items-center gap-1 rounded-md p-1.5 text-center text-xs font-medium active:brightness-95",
        variant == "no-outline" && "text-neutral-700 hover:bg-neutral-100",
        variant != "no-outline" && "border",

        variant == "default" && "bg-white hover:bg-neutral-50",
        variant == "green" &&
          "border-green-700 bg-green-600 text-white hover:bg-green-700",
        variant == "gray" &&
          "border-neutral-700 bg-neutral-600 text-white hover:bg-neutral-700",

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
