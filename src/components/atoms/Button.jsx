import classNames from "classnames";

export default function Button({ label, variant = "default", Icon }) {
  return (
    <button
      type="button"
      className={classNames(
        "inline-flex items-center rounded-lg border px-3 py-2 text-center text-xs font-medium",
        variant == "default" &&
          "border-gray-200 bg-white text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600",
      )}
    >
      {label}
      {Icon && <Icon className="ms-1 size-4" />}
    </button>
  );
}
