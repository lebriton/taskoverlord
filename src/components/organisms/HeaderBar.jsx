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
      <ul className="-mb-px flex flex-wrap justify-center gap-2 text-center text-sm font-medium text-neutral-500">
        {links.map((link) => {
          // TODO:
          let isActive = link.label == "Table View";

          return (
            <li key={link.label}>
              <Link
                to={link.url}
                className={classNames(
                  "group inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 hover:border-neutral-300 hover:text-neutral-600",
                  isActive && "!border-teal-600 !text-teal-600",
                )}
              >
                <link.Icon
                  className={classNames(
                    "me-2 h-4 w-4 text-neutral-400 group-hover:text-neutral-500",
                    isActive && "!text-teal-600",
                  )}
                />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
