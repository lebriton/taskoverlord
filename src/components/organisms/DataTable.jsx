import { useRef, useEffect } from "react";
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
  hasExternalBorder = true,
  stickyHeader = false,
  onSelected,
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const selectedItemRef = useRef(null);
  useEffect(() => {
    selectedItemRef.current?.scrollIntoView({
      behavior: "instant",
      block: "nearest",
    });
  }, [data, selectedItem]);

  return (
    <div
      className={classNames(
        hasExternalBorder && "overflow-clip rounded-md border",
        stickyHeader && "max-h-full overflow-auto",
        className,
      )}
    >
      <table className="w-full table-auto divide-y bg-white text-left text-sm text-neutral-800">
        <thead
          className={classNames(stickyHeader && "sticky top-0 z-10 bg-white")}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="divide-x">
              {headerGroup.headers.map((header) => (
                <th
                  className={classNames(
                    "px-2 py-1 font-semibold uppercase",
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
              ref={selectedItem == row.original ? selectedItemRef : null}
              key={row.id}
              className={classNames(
                "cursor-pointer scroll-mt-7 divide-x hover:bg-neutral-100",
                selectedItem == row.original &&
                  "!bg-blue-600 font-medium text-white",
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
