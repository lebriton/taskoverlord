import classNames from "classnames";
import Badge from "./Badge";

export default function Label({ className, text, badgeText, isOptional }) {
  return (
    <label
      className={classNames(
        "mb-2 flex items-center text-sm font-bold text-neutral-900",
        className,
      )}
    >
      {text}
      {isOptional && (
        <span className="ms-1 font-normal text-neutral-700"> (optional)</span>
      )}
      {badgeText != null && (
        <Badge className="ms-1" text={badgeText} variant="dark" style="tight" />
      )}
    </label>
  );
}
