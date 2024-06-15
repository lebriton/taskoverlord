import { XMarkIcon } from "@heroicons/react/20/solid";
import Button from "./Button";

export default function CloseButton({ ...props }) {
  return <Button variant="plain" Icon={XMarkIcon} {...props} />;
}
