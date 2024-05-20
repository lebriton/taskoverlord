import classNames from "classnames";

export default function Shortcut({ className, text }) {
  return (
    <kbd
      className={classNames(
        "border-100 pointer-events-none w-4 select-none rounded-lg border bg-gray-50 text-center text-xs font-medium text-gray-600",
        className,
      )}
    >
      {text}
    </kbd>
  );
}

export function ShortcutWrap({ className, children, Shortcut }) {
  return (
    <div className={classNames("inline-flex items-center gap-1", className)}>
      {children}
      {Shortcut}
    </div>
  );
}
