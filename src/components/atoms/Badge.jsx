import classNames from "classnames";
import Color from "color";

export default function Badge({
  text,
  variant = "default",
  color = null,
  Icon = null,
}) {
  return (
    <span
      className={classNames(
        "me-2 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium",
        variant == "default" &&
          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        variant == "dark" &&
          "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
        variant == "red" &&
          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        variant == "green" &&
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        variant == "yellow" &&
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        variant == "indigo" &&
          "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
        variant == "purple" &&
          "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
        variant == "pink" &&
          "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
        color && "bg-[color:var(--bg-color)] text-[color:var(--text-color)]",
      )}
      style={{
        "--bg-color": Color(color).alpha(0.5).rgb().string(),
        "--text-color": Color(color).darken(0.65).rgb().string(),
      }}
    >
      {Icon && <Icon className="me-1.5 h-2.5 w-2.5" />}
      {text}
    </span>
  );
}
