import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
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
import Badge from "../atoms/Badge";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    header: () => <IconLabel Icon={IdentificationIcon} label="ID" />,
    cell: (info) => info.getValue() || "-",
  }),
  columnHelper.accessor("project", {
    header: () => <IconLabel Icon={FolderIcon} label="Project" />,
    cell: (info) => info.getValue() || "-",
  }),
  columnHelper.accessor("status", {
    header: () => <IconLabel Icon={CheckCircleIcon} label="Status" />,
    cell: (info) => renderStatus(info),
  }),
  columnHelper.accessor("description", {
    header: () => <IconLabel Icon={Bars3BottomLeftIcon} label="Description" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("modified", {
    header: () => <IconLabel Icon={CalendarIcon} label="Modified" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("tags", {
    header: () => <IconLabel Icon={TagIcon} label="Tags" />,
    cell: (info) => info.getValue() || "-",
  }),
  columnHelper.accessor("urgency", {
    header: () => <IconLabel Icon={FireIcon} label="Urgency" />,
    cell: (info) => info.getValue(),
  }),
];

function renderStatus(info) {
  let status = info.getValue();
  let wait = info.row.original.wait;

  let variant, Icon;
  if (status == "completed") {
    variant = "green";
    Icon = CheckIcon;
  } else if (wait) {
    variant = "indigo";
    Icon = HandRaisedIcon;
    status = "waiting";
  } else {
    // status = "pending"
    variant = "yellow";
    Icon = ClockIcon;
  }

  return <Badge text={status} variant={variant} Icon={Icon} />;
}

export default function TasksTable({ tasks }) {
  const table = useReactTable({
    data: tasks,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full table-auto text-left text-neutral-800">
      <thead className="text-neutral-400">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                scope="col"
                className="border px-6 py-1 font-semibold"
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
          <tr key={row.id} className="hover:bg-teal-50">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border px-6 py-1">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
