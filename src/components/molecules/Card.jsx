import classNames from "classnames";

export default function Card({
  className,
  hasExternalBorder = true,
  children,
}) {
  return (
    <div
      className={classNames(
        "flex flex-col bg-white",
        hasExternalBorder && "overflow-clip rounded-md border",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return (
    <div className={classNames("border-b px-3 py-1.5", className)}>
      {children}
    </div>
  );
}

export function CardBody({ className, children }) {
  return <div className={classNames("grow p-3", className)}>{children}</div>;
}

export function CardFooter({ className, children }) {
  return (
    <div className={classNames("border-t px-3 py-1.5", className)}>
      {children}
    </div>
  );
}
