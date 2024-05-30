import classNames from "classnames";
import Shortcut, { ShortcutWrap } from "../atoms/Shortcut";
import { Link } from "react-router-dom";
import Badge from "../atoms/Badge";

export default function Tabs({ className, children, hasSoftStyle }) {
  return (
    <ul
      className={classNames(
        "z-20 -mb-px flex flex-wrap flex-nowrap gap-3 text-center text-sm text-neutral-800",
        className,
      )}
    >
      {children}
    </ul>
  );
}

export function Tab({
  className,
  variant = "hard",
  label,
  Icon,
  badgeText,
  shortcutText,
  isActive,
  onClick,
}) {
  return (
    <li
      className={classNames(
        "group flex cursor-pointer items-center border-b-2 border-transparent py-1",
        variant == "soft" && !isActive && "text-neutral-500",
        isActive && "!border-orange-400 font-semibold",
        className,
      )}
      onClick={onClick}
    >
      <ShortcutWrap
        className="rounded p-1 group-hover:bg-neutral-100"
        Shortcut={shortcutText && <Shortcut text={shortcutText} />}
      >
        <div className="flex items-center gap-1">
          {Icon && <Icon className="me-1 h-4 w-4 text-neutral-500" />}
          {label}

          {badgeText != null && (
            <Badge
              text={badgeText}
              variant={variant == "soft" && !isActive ? "gray" : "dark"}
              style="tight"
            />
          )}
        </div>
      </ShortcutWrap>
    </li>
  );
}
