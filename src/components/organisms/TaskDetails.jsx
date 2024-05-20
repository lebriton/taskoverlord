import { timeAgo } from "../../utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TrashIcon,
  XMarkIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import {
  FireIcon,
  TagIcon,
  FolderIcon,
  CalendarDaysIcon,
  HandRaisedIcon,
  CursorArrowRaysIcon,
  DocumentIcon,
  ListBulletIcon,
  IdentificationIcon,
  FingerPrintIcon,
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

export default function TaskDetails({ task, onClose }) {
  return (
    <Card className="h-full !bg-neutral-50" hasExternalBorder={false}>
      <CardHeader>
        <FlexLine
          left={
            <div className="flex items-center gap-2">
              <Button Icon={ChevronLeftIcon} />
              <Button Icon={ChevronRightIcon} />
            </div>
          }
          right={
            <div className="flex items-center justify-end gap-2">
              <Button
                className="hover:border-red-700 hover:enabled:bg-red-700"
                variant="gray"
                Icon={TrashIcon}
                shortcutText="d"
                isDisabled={!task}
              >
                Delete
              </Button>
              <Button
                variant="gray"
                Icon={PencilSquareIcon}
                shortcutText="e"
                isDisabled={!task}
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

      <CardBody className="flex h-full flex-col overflow-scroll">
        {task ? (
          <Body task={task} />
        ) : (
          <EmptyState
            className="!h-full"
            Icon={CursorArrowRaysIcon}
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
    {
      Icon: IdentificationIcon,
      name: "Id",
      value: task.id,
    },
    {
      Icon: FingerPrintIcon,
      name: "Uuid",
      value: task.uuid,
    },
  ];

  return (
    <>
      <Heading2 title={task.description} subtitle={`#${task.id}`} />
      <div className="-mt-4 flex items-center justify-between">
        <div>{displayStatusBadgeForTask(task)}</div>
        <span className="text-sm text-neutral-600">
          {/* XXX: + "Z" as a hack to force UTC (for now) */}
          Modified: {timeAgo(new Date(task.modified + "Z"))}
        </span>
      </div>

      <hr className="mt-6" />

      <Heading3 className="mt-6" title="Attributes" />
      {attributes.map((attr, idx) => (
        <div
          key={idx}
          className="py-0.5 font-medium sm:grid sm:grid-cols-3 sm:gap-4"
        >
          <dt className="flex items-center gap-1 text-xs text-neutral-700">
            <attr.Icon className="size-4" />
            {attr.name}
          </dt>
          <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
            {attr.value}
          </dd>
        </div>
      ))}

      <div className="flex items-end justify-between">
        <Heading3 className="mt-6" title="Annotations" badgeText="0" />
        <Button className="mb-1.5" Icon={PlusIcon}>
          Add
        </Button>
      </div>
      <EmptyState
        className="rounded-md bg-neutral-100"
        Icon={DocumentIcon}
        title="No annotation available"
        subtitle="Tasks can contain annotations and they will appear here."
      />

      <div className="flex items-end justify-between">
        <Heading3
          className="mt-6"
          title="User-defined attributes (uda)"
          badgeText="0"
        />
        <Button className="mb-1.5" Icon={PlusIcon}>
          Add
        </Button>
      </div>
      <EmptyState
        className="rounded-md bg-neutral-100"
        Icon={ListBulletIcon}
        title="No attribute available"
        subtitle="Tasks can contain user-defined attributes and they will appear here."
      />
    </>
  );
}
