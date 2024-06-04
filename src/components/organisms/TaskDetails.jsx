import { displayPriority, timeAgo } from "../../utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import {
  CursorArrowRaysIcon,
  DocumentIcon,
  ListBulletIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Button, { ButtonList } from "../atoms/Button";
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
import FormGroup from "../atoms/FormGroup";
import Label from "../atoms/Label";
import TextArea from "../atoms/TextArea";
import { useState } from "react";
import classNames from "classnames";
import TaskForm from "../../forms/TaskForm";

export default function TaskDetails({
  task,
  onClose,
  onPreviousTaskClick,
  onNextTaskClick,
}) {
  const [isEditingDescription, setEditingDescription] = useState(false);

  return (
    <Card
      className={classNames("h-full !bg-neutral-50")}
      hasExternalBorder={false}
    >
      <CardHeader>
        <FlexLine
          left={
            <ButtonList>
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
            </ButtonList>
          }
          right={<Button variant="plain" Icon={XMarkIcon} onClick={onClose} />}
        />
      </CardHeader>

      <CardBody className="h-full overflow-scroll">
        {task ? (
          <>
            <div className="mb-3 flex items-center gap-1.5">
              {displayStatusBadgeForTask(task, true)}
              <span className="text-sm font-medium text-neutral-800">
                {/* XXX: + "Z" as a hack to force UTC (for now) */}
                Modified {timeAgo(new Date(task.modified + "Z"))}
              </span>
            </div>

            <TaskDescriptionForm
              task={task}
              isEditing={isEditingDescription}
              onEdit={() => setEditingDescription(true)}
              //onSubmit
              onClose={() => setEditingDescription(false)}
            />

            <TaskForm task={task} softStyle />

            <hr className="my-3" />

            <Tabs className="!my-3">
              <Tab
                variant="soft"
                label="Annotations"
                badgeText={0}
                isActive={true}
              />
              <Tab variant="soft" label="Uda" badgeText={0} isActive={false} />
              <Tab variant="soft" label="History" isActive={false} />
            </Tabs>

            <EmptyState
              className="rounded-md border"
              Icon={DocumentIcon}
              title="No annotations"
              subtitle="Tasks can contain annotations and they will appear here."
            />

            {false && (
              <EmptyState
                className="rounded-md border"
                Icon={ListBulletIcon}
                title="No attributes"
                subtitle="Tasks can contain user-defined attributes and they will appear here."
              />
            )}

            <hr className="my-3" />

            <div className="inline-flex flex-col gap-1">
              <Button
                className="!font-bold"
                variant="plain"
                size="sm"
                Icon={TrashIcon}
              >
                An action
              </Button>
              <Button
                className="!font-bold hover:enabled:text-red-600"
                variant="plain"
                size="sm"
                Icon={TrashIcon}
              >
                Delete task
              </Button>
            </div>

            <div className="h-12" />
          </>
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

function TaskDescriptionForm({ task, isEditing, onEdit, onSubmit, onClose }) {
  return (
    <div className="mb-6 flex items-start justify-between gap-3">
      {isEditing ? (
        <TextArea rows={1} value={task.description} autoFocus isRequired />
      ) : (
        <Heading2
          className="!mb-0"
          title={task.description}
          subtitle={task.id != 0 && `#${task.id}`}
        />
      )}

      {isEditing ? (
        <ButtonList>
          <Button onClick={onSubmit}>Save</Button>
          <Button variant="plain" onClick={onClose}>
            Cancel
          </Button>
        </ButtonList>
      ) : (
        <Button onClick={onEdit}>Edit</Button>
      )}
    </div>
  );
}
