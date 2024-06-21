import classNames from "classnames";
import Card, { CardHeader } from "./Card";
import Label from "../atoms/Label";
import CloseButton from "../atoms/CloseButton";
import HSeparator from "../atoms/HSeparator";

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

export function DropdownCardHeader({ className, label, extra, onClose }) {
  return (
    <CardHeader className={className}>
      <div className="flex items-center justify-between gap-2">
        <Label className="!mb-0" text={label} />
        {extra && <HSeparator />}
        {extra}
        <div className="grow" />
        <CloseButton className="-me-1.5" onClick={onClose} />
      </div>
    </CardHeader>
  );
}
