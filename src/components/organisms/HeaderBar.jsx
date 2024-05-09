import {
  TableCellsIcon,
  ViewColumnsIcon,
  Bars3BottomRightIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-router";
import classNames from "classnames";
import Badge from "../atoms/Badge";
import Shortcut from "../atoms/Shortcut";

export default function HeaderBar() {
  const links = [
    { label: "Table View", url: "/", Icon: TableCellsIcon, shortcut: "1" },
    { label: "Kanban Board", url: "/", Icon: ViewColumnsIcon, shortcut: "2" },
    {
      label: "Gantt Diagram",
      url: "/",
      Icon: Bars3BottomRightIcon,
      shortcut: "3",
    },
  ];

  return (
    <div className="px-5">
      <ul className="-mb-px flex flex-wrap justify-center gap-3 text-center text-sm text-neutral-800">
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
                <span className="inline-flex items-center justify-center rounded p-1 group-hover:bg-neutral-50">
                  <link.Icon
                    className={classNames("me-2 h-4 w-4 text-neutral-500")}
                  />
                  {link.label}
                  <Shortcut className="ms-1" text={link.shortcut} />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
