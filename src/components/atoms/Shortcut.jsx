import classNames from "classnames";

export default function Shortcut({ className, text }) {
  return (
    <span
      className={classNames(
        "border-100 w-4 rounded-lg border bg-gray-50 text-center text-xs font-medium text-gray-600",
        className,
      )}
    >
      {text}
    </span>
  );
}
