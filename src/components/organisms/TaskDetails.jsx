import { displayPriority, timeAgo } from "../../utils";
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
  ChevronDoubleUpIcon,
  IdentificationIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/outline";
import Button from "../atoms/Button";
import Card, { CardBody, CardHeader } from "../molecules/Card";
import FlexLine from "../molecules/FlexLine";
import {
  atMostXDecimalPoints,
  displayStatusBadgeForTask,
  displayTags,
} from "../../utils";
import Heading2 from "../molecules/Heading2";
import EmptyState from "../molecules/EmptyState";
import Tabs, { Tab } from "./Tabs";

export default function TaskDetails({
  task,
  onClose,
  onPreviousTaskClick,
  onNextTaskClick,
}) {
  return (
    <Card className="h-full !bg-neutral-50" hasExternalBorder={false}>
      <CardHeader>
        <FlexLine
          left={
            <div className="flex items-center gap-2">
              <Button
                Icon={ChevronLeftIcon}
                isDisabled={onPreviousTaskClick == null}
                onClick={onPreviousTaskClick}
              />
              <Button
                Icon={ChevronRightIcon}
                isDisabled={onNextTaskClick == null}
                onClick={onNextTaskClick}
              />
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

      <CardBody className="h-full overflow-scroll">
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
      Icon: ChevronDoubleUpIcon,
      name: "Priority",
      value: displayPriority(task.priority),
    },
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
      <Heading2
        title={task.description}
        subtitle={task.id != 0 && `#${task.id}`}
      />
      <div className="-mt-4 mb-3 flex items-center justify-between">
        <div>{displayStatusBadgeForTask(task)}</div>
        <span className="text-sm text-neutral-600">
          {/* XXX: + "Z" as a hack to force UTC (for now) */}
          Modified: {timeAgo(new Date(task.modified + "Z"))}
        </span>
      </div>

      {attributes.map((attr, idx) => (
        <div key={idx} className="grid grid-cols-3 gap-4 py-1 text-sm">
          <dt className="text-neutral-600">
            <div className="flex items-center gap-1">
              <attr.Icon className="size-4 text-neutral-400" />
              {attr.name}
            </div>
          </dt>
          <dd className="col-span-2">{attr.value}</dd>
        </div>
      ))}

      <div className="flex items-baseline justify-between">
        <Tabs className="!my-1.5">
          <Tab
            label="Annotations"
            badgeText={0}
            shortcutText="a"
            isActive={true}
          />
          <Tab
            label="Uda"
            url=""
            badgeText={0}
            shortcutText="u"
            isActive={false}
          />
        </Tabs>
        <Button className="mb-1.5" Icon={PlusIcon}>
          Add
        </Button>
      </div>

      <EmptyState
        className="rounded-md border-2 border-dashed"
        Icon={DocumentIcon}
        title="No annotations"
        subtitle="Tasks can contain annotations and they will appear here."
      />

      {false && (
        <EmptyState
          className="rounded-md border-2 border-dashed"
          Icon={ListBulletIcon}
          title="No attributes"
          subtitle="Tasks can contain user-defined attributes and they will appear here."
        />
      )}
    </>
  );
}
