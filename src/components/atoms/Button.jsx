import classNames from "classnames";
import { useRef } from "react";
import Shortcut from "./Shortcut";
import Spinner from "./Spinner";
import { useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Dropdown from "../molecules/DropdownCard";

export default function Button({
  type = "button",
  className,
  style,
  variant = "default",
  size = "xs",
  Icon,
  shortcutText = "",
  dropdown,
  isDisabled,
  isLoading,
  onClick,
  children,
}) {
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  useOnClickOutside(dropdownRef, (event) => {
    // Ignore if we click the button
    if (event.target != buttonRef.current) {
      setShowDropdown(false);
    }
  });

  const handleClick = (e) => {
    if (isDisabled || isLoading) {
      return;
    }

    if (dropdown) {
      setShowDropdown(!showDropdown);
    } else {
      if (onClick) onClick(e);
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        type={type}
        disabled={isDisabled}
        className={classNames(
          "group inline-flex items-center justify-center gap-1 text-nowrap rounded-md p-1.5 font-medium",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "[&>*]:pointer-events-none",

          variant == "plain" && "text-neutral-700 enabled:hover:bg-neutral-100",
          variant != "plain" && "border",

          variant == "default" && "bg-white enabled:hover:bg-neutral-50",
          variant == "green" &&
            "border-green-700 bg-green-600 text-white enabled:hover:bg-green-700",
          variant == "gray" &&
            "border-neutral-700 bg-neutral-600 text-white enabled:hover:bg-neutral-700",
          variant == "gray-outline" &&
            "border-neutral-600 text-neutral-600 ring-inset ring-neutral-600 enabled:hover:bg-neutral-600 enabled:hover:text-white [&:not(:hover)]:ring-1",
          variant == "blue" &&
            "border-blue-700 bg-blue-600 text-white enabled:hover:bg-blue-700",
          variant == "blue-outline" &&
            "border-blue-600 text-blue-600 ring-inset ring-blue-600 enabled:hover:bg-blue-600 enabled:hover:text-white [&:not(:hover)]:ring-1",
          variant == "red-outline" &&
            "border-red-600 text-red-600 ring-inset ring-red-600 enabled:hover:bg-red-600 enabled:hover:text-white [&:not(:hover)]:ring-1",

          size == "xs" && "text-xs",
          size == "sm" && "text-sm",

          children && "px-2.5",

          isLoading && "cursor-default",
          !isLoading && "enabled:active:brightness-95",

          variant == "link" &&
            "!border-none !p-0 !font-bold !text-neutral-700 hover:!text-blue-600",

          // a bit hacky
          // todo: activeStyle
          showDropdown && "!text-blue-600",

          className,
        )}
        style={style}
        onClick={handleClick}
      >
        {isLoading && (
          <Spinner
            className={classNames(
              "me-3",
              ["green", "gray", "blue"].includes(variant) && "text-white",
            )}
          />
        )}
        {Icon && variant == "link" && (
          <Icon className="size-4 text-neutral-900 group-hover:text-blue-600" />
        )}
        {Icon && variant != "link" && (
          <Icon
            className={classNames(
              "size-4 text-neutral-700",
              children && "-ms-0.5",
              ["green", "gray", "blue"].includes(variant) && "text-white",
              variant == "gray-outline" &&
                "!text-neutral-600 group-hover:!text-white",
              variant == "blue-outline" &&
                "!text-blue-600 group-hover:!text-white",
              variant == "red-outline" &&
                "!text-red-600 group-hover:!text-white",
            )}
          />
        )}
        {children}
        {shortcutText && <Shortcut className="ms-1" text={shortcutText} />}
      </button>

      {showDropdown && (
        <div ref={dropdownRef} className="relative">
          {dropdown({ onClose: () => setShowDropdown(false) })}
        </div>
      )}
    </>
  );
}

export function ButtonList({ className, children }) {
  return <div className={classNames("flex gap-1", className)}>{children}</div>;
}
