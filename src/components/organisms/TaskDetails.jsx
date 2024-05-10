import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import Button from "../atoms/Button";
import Card, { CardHeader, CardBody } from "../molecules/Card";
import FlexLine from "../molecules/FlexLine";
import Heading3 from "../molecules/Heading3";
import {
  atMostXDecimalPoints,
  displayStatusBadgeForTask,
  displayTags,
} from "../../utils";

export default function TaskDetails({ task, onClose }) {
  const attributes = [
    {
      name: "Status",
      value: task && displayStatusBadgeForTask(task),
    },
    {
      name: "Urgency",
      value: task && atMostXDecimalPoints(task.urgency, 1),
    },
    {
      name: "Tags",
      value: (task && task.tags && displayTags(task.tags)) || "-",
    },
    {
      name: "Project",
      value: task?.project || "-",
    },
    {
      name: "ID",
      value: task?.id,
    },
    {
      name: "UUID",
      value: task?.uuid,
    },
    {
      name: "Due date",
      value: task?.due_date || "-",
    },
    {
      name: "Wait date",
      value: task?.wait_date || "-",
    },
  ];

  return (
    <Card className="mx-3 mb-3 flex-1 overflow-scroll shadow-lg">
      <CardHeader>
        <FlexLine
          left={
            <div className="flex gap-2">
              <Button Icon={ChevronLeftIcon} />
              <Button Icon={ChevronRightIcon} />
            </div>
          }
          right={
            <Button Icon={XMarkIcon} variant="no-outline" onClick={onClose} />
          }
        />
      </CardHeader>
      <CardBody>
        <div className="mb-6 text-xl font-semibold">{task?.description}</div>

        <div className="grid grid-flow-col grid-rows-4 rounded-md bg-neutral-50 px-6 py-3">
          {attributes.map((attr) => (
            <div className="flex items-center">
              <span className="my-1 w-40 max-w-40 truncate text-sm font-semibold text-neutral-500">
                {attr.name}
              </span>
              {attr.value}
            </div>
          ))}
        </div>

        <div className="flex">
          <div className="flex-1">
            <Heading3 className="mb-3 mt-6" title="Annotations" badgeText="x" />
            wip
          </div>
          <div className="flex-1">
            <Heading3
              className="mb-3 mt-6"
              title="Used-defined attributes (UDA)"
              badgeText="y"
            />
            wip
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
