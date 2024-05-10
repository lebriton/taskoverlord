import { useState } from "react";

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/16/solid";
import classNames from "classnames";
import Button from "../atoms/Button";
import Shortcut, { ShortcutWrap } from "../atoms/Shortcut";

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
        <span className="truncate">{selected}</span>
        <div className="pointer-events-none absolute inset-y-0 right-0 ml-10 flex flex-col justify-center pr-2.5">
          <ChevronUpIcon className="-mb-1 h-4 w-4 text-neutral-400" />
          <ChevronDownIcon className="-mt-1 h-4 w-4 text-neutral-400" />
        </div>
      </Button>

      {showItems && (
        <ul
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="listbox"
        >
          {displayedItems.map((item, idx) => (
            <MenuItem key={idx} item={item} isActive={idx==2} isSpecial={idx==0} />
          ))}
        </ul>
      )}
    </div>
  );
}

function MenuItem({ item, isActive, isSpecial }) {
  return (
    <li
      className={
        classNames(
      "relative flex text-sm cursor-default select-none px-2.5 py-2 text-neutral-900 hover:bg-neutral-100 active:brightness-95",
      isActive && "font-semibold bg-blue-50",
      isSpecial && "!text-neutral-500",
        )
      }
      role="option"
    >
      <ShortcutWrap className="w-full"Shortcut={<Shortcut text={item.shortcut} />}>
      <span className="block flex-1 truncate">{item.text}</span>

      {isActive && <CheckIcon className="h-5 w-5 text-blue-600" />}
      </ShortcutWrap>
      
    </li>
  );
}
