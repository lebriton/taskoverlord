import classNames from "classnames";

export default function Card({ className, children }) {
  return (
    <div className={`overflow-clip rounded-md border bg-white ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return (
    <div className={classNames("border-b px-3 py-2", className)}>
      {children}
    </div>
  );
}

export function CardBody({ className, children }) {
  return <div className={classNames("p-3", className)}>{children}</div>;
}

export function CardFooter({ className, children }) {
  return (
    <div className={classNames("border-t px-3 py-2", className)}>
      {children}
    </div>
  );
}
