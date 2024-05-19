import classNames from "classnames";
import Badge from "../atoms/Badge";

export default function Heading3({ className, title, badgeText = "" }) {
  return (
    <h3
      className={classNames(
        "mb-3 flex items-center gap-1 font-bold leading-none tracking-tight text-neutral-800",
        className,
      )}
    >
      {title}
      {badgeText != null && (
        <Badge text={badgeText} variant="dark" style="tight" />
      )}
    </h3>
  );
}
