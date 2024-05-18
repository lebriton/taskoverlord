import classNames from "classnames";
import Button from "../atoms/Button";
import Heading2 from "./Heading2";

import { XMarkIcon } from "@heroicons/react/20/solid";
import Card, { CardBody, CardFooter, CardHeader } from "./Card";

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
        "fixed bottom-0 end-0 top-0 z-40 flex w-full max-w-md flex-col divide-y border-s bg-white shadow-lg",
        !show && "translate-x-full",
      )}
    >
      <Card className="h-full" hasExternalBorder={false}>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <Heading2 className="!mb-0" title={headingTitle} />
            <Button variant="no-outline" Icon={XMarkIcon} onClick={onClose} />
          </div>
        </CardHeader>
        <CardBody>{children}</CardBody>
        <CardFooter>{bottom}</CardFooter>
      </Card>
    </div>
  );
}
