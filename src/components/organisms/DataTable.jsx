import classNames from "classnames";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function DataTable({
  className,
  data,
  selectedItem,
  columns,
  isRowDisabled,
  hasExternalBorder = true,
  stickyHeader = false,
  onSelected,
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className={classNames(
        hasExternalBorder && "overflow-clip rounded-md border",
        stickyHeader && "max-h-full overflow-auto",
        className,
      )}
    >
      <table className="w-full table-auto divide-y text-left text-sm text-neutral-900">
        <thead
          className={classNames(stickyHeader && "sticky top-0 z-10 bg-white")}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="divide-x">
              {headerGroup.headers.map((header) => (
                <th
                  className={classNames(
                    "px-2 py-1 font-semibold uppercase text-neutral-600",
                    stickyHeader && "sticky-header-fix",
                  )}
                  key={header.id}
                  scope="col"
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
        <tbody className="divide-y">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={classNames(
                "cursor-pointer divide-x hover:bg-neutral-100",
                selectedItem == row.original && "!bg-blue-100",
                isRowDisabled(row) && "bg-neutral-50 text-neutral-400",
              )}
              onClick={() => onSelected(row.original)}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  align={cell.column.columnDef.meta?.align}
                  className={classNames(
                    "px-2 py-1",
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
    </div>
  );
}
