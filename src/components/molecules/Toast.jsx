import Button from "../atoms/Button";
import Card, { CardBody } from "./Card";
import classNames from "classnames";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import CloseButton from "../atoms/CloseButton";

export default function Toast({
  className,
  variant = "info",
  children,
  onClose,
}) {
  return (
    <Card
      className={classNames(
        "w-full max-w-sm animate-fade-up text-neutral-500 shadow-lg",
        className,
      )}
      role="alert"
    >
      <CardBody className="flex items-start gap-2 !px-1.5">
        <div
          className={classNames(
            "inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg",

            variant == "info" && "bg-indigo-100 text-indigo-500",
            variant == "success" && "bg-green-100 text-green-500",
            variant == "warning" && "bg-amber-100 text-amber-500",
            variant == "error" && "bg-red-100 text-red-500",
          )}
        >
          {variant == "info" && <InformationCircleIcon className="size-5" />}
          {variant == "success" && <CheckIcon className="size-5" />}
          {variant == "warning" && (
            <ExclamationTriangleIcon className="size-5" />
          )}
          {variant == "error" && <XCircleIcon className="size-5" />}
        </div>
        <div className="mt-1 grow text-sm">{children}</div>
        <CloseButton onClick={onClose} />
      </CardBody>
    </Card>
  );
}
