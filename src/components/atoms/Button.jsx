import classNames from "classnames";

export default function Button({ label, variant = "default", Icon }) {
  return (
    <button
      type="button"
      className={classNames(
        "inline-flex items-center gap-1 rounded-md p-1.5 text-center text-xs font-medium",
        variant == "no-outline" && "text-neutral-700 hover:bg-neutral-100",
        variant != "no-outline" && "border bg-white",

        variant == "default" &&
          "hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600",

        label && "px-2.5",
      )}
    >
      {label}
      {Icon && <Icon className="size-4 text-neutral-700" />}
    </button>
  );
}
