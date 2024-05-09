import {
  TableCellsIcon,
  ViewColumnsIcon,
  Bars3BottomRightIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-router";
import classNames from "classnames";

export default function HeaderBar() {
  const links = [
    { label: "Table View", url: "/", Icon: TableCellsIcon },
    { label: "Kanban Board", url: "/", Icon: ViewColumnsIcon },
    { label: "Gantt Diagram", url: "/", Icon: Bars3BottomRightIcon },
  ];

  return (
    <div className="px-5">
      <ul className="-mb-px flex flex-wrap justify-center gap-2 text-center text-sm">
        {links.map((link) => {
          // TODO:
          let isActive = link.label == "Table View";

          return (
            <li key={link.label}>
              <Link
                to={link.url}
                className={classNames(
                  "group flex border-b-2 border-transparent p-3",
                  isActive && "!border-orange-400 font-semibold",
                )}
              >
                <span className="inline-flex items-center justify-center rounded p-1 group-hover:bg-neutral-50">
                  <link.Icon
                    className={classNames("me-2 h-4 w-4 text-neutral-500")}
                  />
                  {link.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
