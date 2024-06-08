import { displayPriority, getRealTaskStatus, timeAgo } from "../../utils";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/tauri";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  StopIcon,
  PlayIcon,
  CheckIcon,
  ArrowUturnLeftIcon,
  CheckCircleIcon,
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
import Heading3 from "../molecules/Heading3";
import EmptyState from "../molecules/EmptyState";
import Tabs, { Tab } from "./Tabs";
import FormGroup from "../atoms/FormGroup";
import Label from "../atoms/Label";
import TextArea from "../atoms/TextArea";
import { useState } from "react";
import classNames from "classnames";
import TaskForm from "../../forms/TaskForm";
import Timer from "../atoms/Timer";
import { useToast } from "../../contexts/ToastContext";

export default function TaskDetails({
  task,
  onClose,
  onPreviousTaskClick,
  onNextTaskClick,
}) {
  const [isEditingDescription, setEditingDescription] = useState(false);
  const addToast = useToast();

  const queryClient = useQueryClient();
  const updateStatus = async (action) => {
    await invoke("update_task_status", { taskUuid: task.uuid, action: action });
    queryClient.invalidateQueries({ queryKey: ["tasks"] });

    let message = "Task updated successfully!";
    switch (action) {
      case "complete":
        message = "Task marked as completed!";
        break;
      case "delete":
        message = "Task has been deleted.";
        break;
      case "reset":
      case "restore":
        message = "Task status restored to pending.";
        break;
    }
    addToast(message, "success");
  };

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

            <Tabs>
              <Tab variant="soft" label="Overview" isActive={true} />
              <Tab
                variant="soft"
                label="Annotations"
                badgeText={0}
                isActive={false}
              />
              <Tab variant="soft" label="Uda" badgeText={0} isActive={false} />
              <Tab
                variant="soft"
                label="History"
                badgeText={0}
                isActive={false}
              />
            </Tabs>

            <hr className="mb-3" />

            <ActionsCard
              task={task}
              onStart={() => updateStatus("start")}
              onStop={() => updateStatus("stop")}
              onComplete={() => updateStatus("complete")}
              onReset={() => updateStatus("reset")}
            />

            <TaskForm task={task} softStyle />

            {false && (
              <>
                <EmptyState
                  className="rounded-md border"
                  Icon={DocumentIcon}
                  title="No annotations"
                  subtitle="Tasks can contain annotations and they will appear here."
                />
                <EmptyState
                  className="rounded-md border"
                  Icon={ListBulletIcon}
                  title="No attributes"
                  subtitle="Tasks can contain user-defined attributes and they will appear here."
                />
              </>
            )}

            <hr className="my-3" />

            <div className="inline-flex flex-col gap-1">
              {getRealTaskStatus(task) == "deleted" ? (
                <Button
                  variant="link"
                  size="sm"
                  Icon={ArrowUturnLeftIcon}
                  onClick={() => updateStatus("restore")}
                >
                  Restore task
                </Button>
              ) : (
                <Button
                  variant="link"
                  size="sm"
                  Icon={TrashIcon}
                  onClick={() => updateStatus("delete")}
                >
                  Delete task
                </Button>
              )}
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

function ActionsCard({ task, onStart, onStop, onComplete, onReset }) {
  const status = getRealTaskStatus(task);

  if (status == "deleted") {
    return;
  }

  const leftAction = () => {
    switch (status) {
      case "pending":
        return (
          <Button variant="gray" Icon={PlayIcon} onClick={onStart}>
            Start task
          </Button>
        );
      case "completed":
        return (
          <Button
            variant="gray-outline"
            Icon={ArrowUturnLeftIcon}
            onClick={onReset}
          >
            Reset task
          </Button>
        );
      default:
        return (
          <Button variant="gray-outline" Icon={StopIcon} onClick={onStop}>
            Stop task
          </Button>
        );
    }
  };

  return (
    <>
      <Card className="my-3 border-neutral-300 !bg-neutral-50">
        <CardBody className="!px-1.5">
          <FlexLine
            left={leftAction()}
            center={
              status == "in progress" && (
                <Timer startDateTime={new Date(task.start + "Z")} />
              )
            }
            right={
              status != "completed" && (
                <Button
                  variant={status == "in progress" ? "blue" : "gray-outline"}
                  Icon={status == "in progress" ? CheckCircleIcon : CheckIcon}
                  onClick={onComplete}
                >
                  Complete task
                </Button>
              )
            }
          />
        </CardBody>
      </Card>
      <hr className="my-3" />
    </>
  );
}
