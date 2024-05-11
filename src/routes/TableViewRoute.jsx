import { createColumnHelper } from "@tanstack/react-table";
import TimeAgo from "javascript-time-ago";
import {
  atMostXDecimalPoints,
  displayStatusBadgeForTask,
  displayTags,
} from "../utils";
import {
  FireIcon,
  CalendarIcon,
  TagIcon,
  Bars3BottomLeftIcon,
  CheckCircleIcon,
  FolderIcon,
  IdentificationIcon,
} from "@heroicons/react/20/solid";
import IconLabel from "../components/atoms/IconLabel";
import en from "javascript-time-ago/locale/en";
import DataTable from "../components/organisms/DataTable";
import { useSuspenseQuery } from "@tanstack/react-query";

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
      return displayStatusBadgeForTask(task);
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
      return tags ? displayTags(tags) : "-";
    },
  }),
  columnHelper.accessor("urgency", {
    header: () => <IconLabel Icon={FireIcon} label="Urgency" />,
    cell: (info) => atMostXDecimalPoints(info.getValue(), 1),
    meta: {
      align: "right",
      className: "whitespace-nowrap",
    },
  }),
];

export default function TableViewRoute() {
  const tasksQuery = useSuspenseQuery({ queryKey: ["tasks"] });

  return (
    <DataTable
      data={tasksQuery.data}
      columns={columns}
      isRowDisabled={(row) => row.original.status == "completed"}
      onSelected={(task) => console.log(task)}
    />
  );
}
