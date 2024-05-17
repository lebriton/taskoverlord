import classNames from "classnames";
import Button from "../atoms/Button";
import Heading2 from "./Heading2";

import { XMarkIcon } from "@heroicons/react/20/solid";

export default function RightFloatingColumn({
  headingTitle,
  show,
  children,
  bottom,
  onClose,
}) {
  return (
    <div
      className={classNames(
        "fixed bottom-0 end-0 top-0 flex w-full max-w-md flex-col divide-y border-s bg-white shadow-lg",
        !show && "translate-x-full",
      )}
    >
      <div className="flex items-center justify-between gap-3 p-3">
        <Heading2 className="!mb-0" title={headingTitle} />
        <Button variant="no-outline" Icon={XMarkIcon} onClick={onClose} />
      </div>

      <div className="flex-1 p-3">{children}</div>

      <div className="p-3">{bottom}</div>
    </div>
  );
}
