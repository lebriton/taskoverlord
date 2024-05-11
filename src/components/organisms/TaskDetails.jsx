import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TrashIcon,
  XMarkIcon,
  PencilSquareIcon,
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
    <Card className="mx-3 mb-3 flex-1 overflow-scroll">
      <CardHeader className="bg-neutral-50">
        <FlexLine
          left={
            <div className="flex gap-2">
              <Button Icon={ChevronLeftIcon} />
              <Button Icon={ChevronRightIcon} />
            </div>
          }
          center={<Heading3 title="Task" />}
          right={
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="no-outline"
                Icon={TrashIcon}
                shortcutText="d"
              ></Button>
              <Button variant="gray" Icon={PencilSquareIcon} shortcutText="e">
                Edit
              </Button>

              {/* Vertical divider */}
              <div className="h-4 border-l" />

              <Button variant="no-outline" Icon={XMarkIcon} onClick={onClose} />
            </div>
          }
        />
      </CardHeader>
      <CardBody className="p-0">
        <div className="flex divide-x">
          <div className="w-3/5 p-3">
            <div className="mb-6 text-xl font-semibold">
              {task?.description}
            </div>

            {attributes.map((attr, idx) => (
              <div key={idx} className="flex items-center font-medium">
                <span className="my-1.5 w-40 max-w-40 truncate text-sm text-neutral-500">
                  {attr.name}
                </span>
                {attr.value}
              </div>
            ))}
          </div>

          <div className="flex-1 p-3">
            <Heading3
              className="mb-3 mt-1.5"
              title="Annotations"
              badgeText="x"
            />
            wip
            <Heading3
              className="mb-3 mt-12"
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
