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
        "inline-flex items-center gap-1 rounded-md p-1.5 text-center text-xs font-medium",
        variant == "no-outline" && "text-neutral-700 hover:bg-neutral-100",
        variant != "no-outline" && "border bg-white",

        variant == "default" &&
          "ring-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600",
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
