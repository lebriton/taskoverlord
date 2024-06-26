import { useState } from "react";

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/16/solid";
import classNames from "classnames";
import Button from "../atoms/Button";
import Shortcut from "../atoms/Shortcut";

export default function SelectMenu({ className, items, defaultItem }) {
  const displayedItems = [defaultItem, ...items];

  const [selected, setSelected] = useState(displayedItems[0]);
  const [showItems, setShowItems] = useState(false);

  return (
    <div className={classNames("relative", className)}>
      <Button
        className="relative w-full cursor-default pr-10"
        onClick={() => setShowItems(!showItems)}
      >
        <span
          className={classNames(
            "truncate",
            selected.text == displayedItems[0].text &&
              "font-normal italic text-neutral-500",
          )}
        >
          {selected.text}
        </span>
        <div className="pointer-events-none absolute inset-y-0 right-0 ml-10 flex flex-col justify-center pr-2.5">
          <ChevronUpIcon className="-mb-1 h-4 w-4 text-neutral-400" />
          <ChevronDownIcon className="-mt-1 h-4 w-4 text-neutral-400" />
        </div>
      </Button>

      {showItems && (
        <ul
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-15 focus:outline-none"
          role="listbox"
        >
          {displayedItems.map((item, idx) => (
            <MenuItem
              key={idx}
              item={item}
              isActive={item.text == selected.text}
              isSpecial={idx == 0}
              onClick={() => {
                setSelected(item);
                setShowItems(false);
              }}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function MenuItem({ item, isActive, isSpecial, onClick }) {
  return (
    <li
      className={classNames(
        "relative flex cursor-pointer select-none px-2.5 py-2 text-sm text-neutral-800 hover:bg-neutral-100 active:brightness-95",
        isActive && "!bg-blue-50",
        isSpecial && "italic !text-neutral-500",
        isActive && !isSpecial && "font-semibold",
      )}
      role="option"
      onClick={onClick}
    >
      <Shortcut className="me-4" text={item.shortcut} />
      <span className="block flex-1 truncate">{item.text}</span>

      {isActive && <CheckIcon className="h-5 w-5 text-blue-600" />}
    </li>
  );
}
