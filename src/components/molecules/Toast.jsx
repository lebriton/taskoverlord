import Button from "../atoms/Button";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Card, { CardBody } from "./Card";
import classNames from "classnames";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

export default function Toast({
  className,
  variant = "info",
  children,
  onClose,
}) {
  return (
    <Card
      className={classNames(
        "w-full max-w-sm text-neutral-500 shadow-lg",
        className,
      )}
      role="alert"
    >
      <CardBody className="flex items-start gap-3">
        <div
          className={classNames(
            "inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg",

            variant == "info" && "bg-indigo-100 text-indigo-500",
            variant == "warning" && "bg-amber-100 text-amber-500",
            variant == "error" && "bg-red-100 text-red-500",
          )}
        >
          {variant == "info" && <InformationCircleIcon className="size-5" />}
          {variant == "warning" && (
            <ExclamationTriangleIcon className="size-5" />
          )}
          {variant == "error" && <XCircleIcon className="size-5" />}
        </div>
        <div className="mt-1 grow">{children}</div>
        <Button variant="no-outline" Icon={XMarkIcon} onClick={onClose} />
      </CardBody>
    </Card>
  );
}
