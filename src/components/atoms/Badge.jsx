import classNames from "classnames";
import Color from "color";

export default function Badge({
  text,
  variant = "default",
  style = "normal",
  color = null,
  Icon = null,
}) {
  return (
    <span
      className={classNames(
        "inline-flex items-center text-xs font-medium",
        variant == "default" &&
          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        variant == "gray" &&
          "bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-gray-300",
        variant == "dark" && "bg-neutral-600 text-white",
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

        style == "normal" && "rounded px-2.5 py-0.5 font-medium",
        style == "tight" && "rounded-lg px-1 font-semibold",
      )}
      style={
        color && {
          backgroundColor: Color(color).alpha(0.5).rgb().string(),
          color: Color(color).darken(0.65).rgb().string(),
        }
      }
    >
      {Icon && <Icon className="-ms-1 me-1.5 size-3 brightness-150" />}
      {text}
    </span>
  );
}

export function BadgeList({ className, children }) {
  return (
    <div className={classNames("inline-flex items-center gap-1.5", className)}>
      {children}
    </div>
  );
}
