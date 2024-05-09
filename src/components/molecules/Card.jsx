import classNames from "classnames";

export default function Card({ className, children }) {
  return (
    <div className={`overflow-clip rounded-lg border bg-white ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return (
    <div className={classNames("border-b p-3", className)}>{children}</div>
  );
}

export function CardBody({ className, children }) {
  return <div className={classNames("p-3", className)}>{children}</div>;
}

export function CardFooter({ className, children }) {
  return (
    <div className={classNames("border-t p-3", className)}>{children}</div>
  );
}
