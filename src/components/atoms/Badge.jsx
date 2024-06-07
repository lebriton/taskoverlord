import classNames from "classnames";
import Color from "color";

export default function Badge({
  className,
  text,
  variant = "default",
  style = "normal",
  color = null,
  Icon = null,
}) {
  return (
    <span
      className={classNames(
        "inline-flex items-center text-xs font-medium capitalize",

        variant == "outline" && "border text-neutral-700",
        variant == "default" &&
          "bg-blue-200 text-blue-900 dark:bg-blue-900 dark:text-blue-300",

        variant == "gray" &&
          "bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-gray-300",
        variant == "dark" && "bg-neutral-600 text-white",
        variant == "red" &&
          "bg-red-200 text-red-900 dark:bg-red-900 dark:text-red-300",
        variant == "green" &&
          "bg-green-200 text-green-900 dark:bg-green-900 dark:text-green-300",
        variant == "yellow" &&
          "bg-yellow-200 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-300",
        variant == "indigo" &&
          "bg-indigo-200 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-300",
        variant == "purple" &&
          "bg-purple-200 text-purple-900 dark:bg-purple-900 dark:text-purple-300",
        variant == "pink" &&
          "bg-pink-200 text-pink-900 dark:bg-pink-900 dark:text-pink-300",

        style == "normal" && "rounded px-2.5 py-0.5",
        style == "tight" && "rounded-lg px-1 font-semibold",
        style == "pill" && "rounded-full px-2.5 py-0.5",

        className,
      )}
      style={
        color && {
          backgroundColor: Color(color).lighten(0.1).rgb().string(),
          color: Color(color).darken(0.75).rgb().string(),
        }
      }
    >
      {Icon && <Icon className="-ms-1.5 me-1 size-3 brightness-150" />}
      {text}
    </span>
  );
}

export function BadgeList({ className, children }) {
  return (
    <div className={classNames("inline-flex items-center gap-1", className)}>
      {children}
    </div>
  );
}
