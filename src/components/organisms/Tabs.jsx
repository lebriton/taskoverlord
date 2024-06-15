import classNames from "classnames";
import Shortcut, { ShortcutWrap } from "../atoms/Shortcut";
import { Link } from "react-router-dom";
import Badge from "../atoms/Badge";
import { useState, createContext, useContext, Children } from "react";

const Context = createContext();

export function TabContext({ defaultValue, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <Context.Provider value={{ activeTab, setActiveTab }}>
      {Children.map(children, (child) => {
        if (child.type.name == "TabPanel") {
          const { value } = child.props;

          if (value != activeTab) return;
        }

        return child;
      })}
    </Context.Provider>
  );
}

export default function Tabs({ className, children }) {
  return (
    <ul
      className={classNames(
        "z-20 -mb-px flex flex-nowrap gap-3 text-center text-sm text-neutral-800",
        className,
      )}
    >
      {children}
    </ul>
  );
}

export function Tab({
  className,
  value,
  variant = "hard",
  label,
  Icon,
  badgeText,
  shortcutText,
}) {
  const { activeTab, setActiveTab } = useContext(Context);

  const isActive = value == activeTab;

  return (
    <li
      className={classNames(
        "group flex cursor-pointer flex-nowrap items-center text-nowrap border-b-2 border-transparent py-1",
        variant == "soft" && !isActive && "text-neutral-500",
        isActive && "!border-orange-400 font-semibold",
        className,
      )}
      onClick={() => setActiveTab(value)}
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
              className={isActive && "!font-semibold"}
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

export function TabPanel({ value, children }) {
  return children;
}
