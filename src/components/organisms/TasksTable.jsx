import classNames from "classnames";
import TimeAgo from "javascript-time-ago";
import { getRealTaskStatus } from "../../utils";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import uniqolor from "uniqolor";
import {
  FireIcon,
  CalendarIcon,
  TagIcon,
  Bars3BottomLeftIcon,
  CheckCircleIcon,
  FolderIcon,
  IdentificationIcon,
} from "@heroicons/react/20/solid";
import {
  HandRaisedIcon,
  CheckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import IconLabel from "../atoms/IconLabel";
import Badge, { BadgeList } from "../atoms/Badge";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en-US");

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    header: () => <IconLabel Icon={IdentificationIcon} label="ID" />,
    cell: (info) => {
      let id = info.getValue();
      if (id === 0) {
        return "-";
      }

      return <span className="font-semibold">{id}</span>;
    },
    meta: {
      align: "center",
      className: "whitespace-nowrap",
    },
  }),
  columnHelper.accessor("project", {
    header: () => <IconLabel Icon={FolderIcon} label="Project" />,
    cell: (info) => info.getValue() || "-",
    meta: {
      className: "whitespace-nowrap",
    },
  }),
  columnHelper.accessor("status", {
    header: () => <IconLabel Icon={CheckCircleIcon} label="Status" />,
    cell: (info) => {
      let task = info.row.original;
      let status = getRealTaskStatus(task);

      let variant, Icon;
      switch (status) {
        case "completed":
          variant = "green";
          Icon = CheckIcon;
          break;
        case "pending":
          variant = "yellow";
          Icon = ClockIcon;
          break;
        case "waiting":
          variant = "indigo";
          Icon = HandRaisedIcon;
          break;
      }

      return <Badge text={status} variant={variant} Icon={Icon} />;
    },
    meta: {
      className: "whitespace-nowrap",
    },
  }),
  columnHelper.accessor("description", {
    header: () => <IconLabel Icon={Bars3BottomLeftIcon} label="Description" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("modified", {
    header: () => <IconLabel Icon={CalendarIcon} label="Modified" />,
    cell: (info) => {
      // XXX: + "Z" as a hack to force UTC (for now)
      return timeAgo.format(new Date(info.getValue() + "Z"));
    },
    meta: {
      className: "whitespace-nowrap",
    },
  }),
  columnHelper.accessor("tags", {
    header: () => <IconLabel Icon={TagIcon} label="Tags" />,
    cell: (info) => {
      let tags = info.getValue();
      if (!tags) return "-";

      return (
        <BadgeList>
          {tags.map((tag) => (
            <Badge
              key={tag}
              text={tag}
              color={
                uniqolor(tag, { saturation: 80, lightness: [70, 80] }).color
              }
            />
          ))}{" "}
        </BadgeList>
      );
    },
  }),
  columnHelper.accessor("urgency", {
    header: () => <IconLabel Icon={FireIcon} label="Urgency" />,
    // display the float with at most 1 decimal place
    cell: (info) => parseFloat(info.getValue().toFixed(1)),
    meta: {
      align: "right",
      className: "whitespace-nowrap",
    },
  }),
];

export default function TasksTable({ tasks }) {
  const table = useReactTable({
    data: tasks,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full table-auto text-left text-sm text-neutral-700">
      <thead className="bg-neutral-100 text-xs text-neutral-500">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                scope="col"
                className="border px-2 py-1 font-semibold"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className={classNames(
              "odd:bg-white even:bg-neutral-50 hover:bg-teal-50",
              // TODO: refactor into a more generic approach
              row.original.status == "completed" && "text-neutral-400",
            )}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                align={cell.column.columnDef.meta?.align}
                className={classNames(
                  "border px-2 py-1",
                  cell.column.columnDef.meta?.className,
                )}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
