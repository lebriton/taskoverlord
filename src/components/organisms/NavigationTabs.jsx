import { Link } from "@tanstack/react-router";
import classNames from "classnames";
import Shortcut, { ShortcutWrap } from "../atoms/Shortcut";

export default function NavigationTabs({ className, links }) {
  return (
    <ul
      className={classNames(
        "-mb-px flex flex-wrap justify-center gap-3 text-center text-sm text-neutral-800",
        className,
      )}
    >
      {links.map((link) => {
        // TODO:
        let isActive = link.label == "Table View";

        return (
          <li key={link.label}>
            <Link
              to={link.url}
              className={classNames(
                "group flex items-center border-b-2 border-transparent py-3",
                isActive && "!border-orange-400 font-semibold",
              )}
            >
              <ShortcutWrap
                className="rounded p-1 group-hover:bg-neutral-100"
                Shortcut={<Shortcut text={link.shortcut} />}
              >
                <div className="flex items-center gap-2">
                  <link.Icon className="h-4 w-4 text-neutral-500" />
                  {link.label}
                </div>
              </ShortcutWrap>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
