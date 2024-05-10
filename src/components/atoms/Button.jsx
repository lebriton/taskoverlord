import classNames from "classnames";

export default function Button({
  className,
  variant = "default",
  Icon,
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

        children && "px-2.5",

        className,
      )}
      onClick={onClick}
    >
      {children}
      {Icon && (
        <Icon
          className={classNames(
            "size-4 text-neutral-700",
            variant == "green" && "text-white",
          )}
        />
      )}
    </button>
  );
}
