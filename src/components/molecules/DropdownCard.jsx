import classNames from "classnames";
import Card, { CardHeader } from "./Card";
import Label from "../atoms/Label";
import CloseButton from "../atoms/CloseButton";

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

export function DropdownCardHeader({ label, onClose }) {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <Label className="!mb-0" text={label} />
        <CloseButton className="-me-1.5" onClick={onClose} />
      </div>
    </CardHeader>
  );
}
