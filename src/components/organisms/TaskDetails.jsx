import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TrashIcon,
  XMarkIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import {
  FireIcon,
  TagIcon,
  FolderIcon,
  CalendarDaysIcon,
  HandRaisedIcon,
  PencilIcon,
  InformationCircleIcon,
  CursorArrowRippleIcon,
} from "@heroicons/react/24/outline";
import Button from "../atoms/Button";
import Card, { CardBody, CardHeader } from "../molecules/Card";
import FlexLine from "../molecules/FlexLine";
import Heading3 from "../molecules/Heading3";
import {
  atMostXDecimalPoints,
  displayStatusBadgeForTask,
  displayTags,
} from "../../utils";
import Heading2 from "../molecules/Heading2";
import EmptyState from "../molecules/EmptyState";

export default function TaskDetails({ className, task, onClose }) {
  return (
    <Card className={className} hasExternalBorder={false}>
      <CardHeader className="bg-neutral-50">
        <FlexLine
          left={
            <div className="flex items-center gap-2">
              <Button Icon={ChevronLeftIcon} />
              <Button Icon={ChevronRightIcon} />

              {/* Vertical divider */}
              <div className="h-4 border-l" />

              <span className="text-neutral-400">Task details</span>
            </div>
          }
          center={
            <div className="text-sm font-medium text-neutral-500">
              {task?.uuid}
            </div>
          }
          right={
            <div className="flex items-center justify-end gap-2">
              <Button
                className="hover:enabled:text-red-600"
                variant="no-outline"
                Icon={TrashIcon}
                shortcutText="d"
                disabled={!task}
              >
                Delete
              </Button>
              <Button
                variant="gray"
                Icon={PencilSquareIcon}
                shortcutText="e"
                disabled={!task}
              >
                Edit
              </Button>

              {/* Vertical divider */}
              <div className="h-4 border-l" />

              <Button variant="no-outline" Icon={XMarkIcon} onClick={onClose} />
            </div>
          }
        />
      </CardHeader>

      <CardBody className="flex flex-col">
        {task ? (
          <Body task={task} />
        ) : (
          <EmptyState
            Icon={CursorArrowRippleIcon}
            title="No task selected"
            subtitle="Pick one to display its data."
          />
        )}
      </CardBody>
    </Card>
  );
}

function Body({ task }) {
  const attributes = [
    {
      Icon: FireIcon,
      name: "Urgency",
      value: atMostXDecimalPoints(task.urgency, 1),
    },
    {
      Icon: TagIcon,
      name: "Tags",
      value: (task.tags && displayTags(task.tags)) || "-",
    },
    {
      Icon: FolderIcon,
      name: "Project",
      value: task.project || "-",
    },
    {
      Icon: CalendarDaysIcon,
      name: "Due date",
      value: task.due || "-",
    },
    {
      Icon: HandRaisedIcon,
      name: "Wait date",
      value: task.wait || "-",
    },
  ];

  return (
    <div className="flex divide-x">
      <div className="w-3/4 pe-3">
        <Heading2 title={task.description} subtitle={`#${task.id}`} />
        <div className="-mt-4">{displayStatusBadgeForTask(task)}</div>
        <hr className="my-6" />
        <Heading3 title="Annotations" badgeText="0" />
        <EmptyState
          className="rounded-md bg-neutral-50"
          Icon={PencilIcon}
          title="No annotation available"
          subtitle="Tasks can contain annotations and they will appear here."
        />

        <Heading3
          className="mt-12"
          title="User-defined attributes"
          badgeText="0"
        />
        <EmptyState
          className="rounded-md bg-neutral-50"
          Icon={InformationCircleIcon}
          title="No attribute available"
          subtitle="Tasks can contain user-defined attributes and they will appear here."
        />
      </div>

      <div className="flex-1 ps-3">
        {attributes.map((attr, idx) => (
          <div
            key={idx}
            className="py-1.5 font-medium sm:grid sm:grid-cols-3 sm:gap-4"
          >
            <dt className="flex items-center gap-1.5 text-sm leading-6 text-neutral-700">
              <attr.Icon className="size-5" />
              {attr.name}
            </dt>
            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
              {attr.value}
            </dd>
          </div>
        ))}
      </div>
    </div>
  );
}
