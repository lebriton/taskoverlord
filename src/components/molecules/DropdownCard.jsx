import classNames from "classnames";
import Card from "./Card";

export default function DropdownCard({ className, children }) {
  return (
    <Card
      className={classNames(
        "absolute right-0 z-10 mt-1 w-56 origin-top-right overflow-auto rounded-md shadow-lg ring-1 ring-black ring-opacity-15 focus:outline-none",
        className,
      )}
    >
      {children}
    </Card>
  );
}
