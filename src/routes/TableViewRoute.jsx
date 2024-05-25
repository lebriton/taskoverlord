import { createColumnHelper } from "@tanstack/react-table";
import { displayPriority, timeAgo } from "../utils";
import { useOutletContext } from "react-router-dom";
import {
  atMostXDecimalPoints,
  displayStatusBadgeForTask,
  displayTags,
} from "../utils";
import {
  FireIcon,
  ClockIcon,
  TagIcon,
  Bars3BottomLeftIcon,
  CheckCircleIcon,
  FolderIcon,
  ChevronDoubleUpIcon,
  IdentificationIcon,
} from "@heroicons/react/20/solid";
import IconLabel from "../components/atoms/IconLabel";
import DataTable from "../components/organisms/DataTable";
import EmptyState from "../components/molecules/EmptyState";
import { CubeIcon } from "@heroicons/react/24/outline";

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
    header: () => <IconLabel Icon={ClockIcon} label="Modified" />,
    cell: (info) => {
      // XXX: + "Z" as a hack to force UTC (for now)
      return timeAgo(new Date(info.getValue() + "Z"));
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
  columnHelper.accessor("priority", {
    header: () => <IconLabel Icon={ChevronDoubleUpIcon} label="Priority" />,
    cell: (info) => {
      const priority = info.getValue();
      return (priority && displayPriority(priority)) || "-";
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
  const [tasksQuery, selectedTask, displayTaskDetails] = useOutletContext();

  return tasksQuery.data.length ? (
    <DataTable
      data={tasksQuery.data}
      selectedItem={selectedTask}
      columns={columns}
      hasExternalBorder={false}
      stickyHeader={true}
      onSelected={displayTaskDetails}
    />
  ) : (
    <EmptyState
      className="!h-full"
      Icon={CubeIcon}
      title="No tasks"
      subtitle="Looks like you haven't created any tasks yet."
    />
  );
}
