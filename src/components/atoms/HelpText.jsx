import classNames from "classnames";

export default function HelpText({ className, children }) {
  return (
    <p className={classNames("mt-2 text-sm text-neutral-500", className)}>
      {children}
    </p>
  );
}
