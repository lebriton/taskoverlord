import { displayPriority, getRealTaskStatus, timeAgo } from "../../utils";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { invoke } from "@tauri-apps/api/tauri";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
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
  displayStatusBadge,
  displayTags,
} from "../../utils";
import Heading2 from "../molecules/Heading2";
import EmptyState from "../molecules/EmptyState";
import Tabs, { Tab, TabContext, TabPanel } from "./Tabs";
import FormGroup from "../atoms/FormGroup";
import Label from "../atoms/Label";
import TextArea from "../atoms/TextArea";
import { useRef, useEffect, useState } from "react";
import classNames from "classnames";
import TaskForm from "../../forms/TaskForm";
import Timer from "../atoms/Timer";
import { useToast } from "../../contexts/ToastContext";
import CloseButton from "../atoms/CloseButton";
import Input from "../atoms/Input";

export default function TaskDetails({
  task,
  onSubmit,
  onClose,
  onPreviousTaskClick,
  onNextTaskClick,
}) {
  const addToast = useToast();

  const queryClient = useQueryClient();
  const updateStatus = (action) =>
    invoke("update_task_status", { taskUuid: task.uuid, action: action })
      .then(() => {
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
            message = "Task has been restored.";
            break;
        }
        addToast(message, "success");
      })
      .catch((error) => addToast(`An error occured: ${error}`, "error"));

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
          right={<CloseButton onClick={onClose} />}
        />
      </CardHeader>

      <CardBody className="h-full overflow-scroll">
        {task ? (
          <>
            <div className="mb-3 flex items-center gap-1.5">
              {displayStatusBadge(getRealTaskStatus(task), true)}
              <span className="text-sm font-medium text-neutral-800">
                {/* XXX: + "Z" as a hack to force UTC (for now) */}
                Modified {timeAgo(new Date(task.modified + "Z"))}
              </span>
            </div>

            <TaskDescription task={task} onSubmit={onSubmit} />

            <TabContext defaultValue="overview">
              <Tabs>
                <Tab value="overview" variant="soft" label="Overview" />
                <Tab
                  value="annotations"
                  variant="soft"
                  label="Annotations"
                  badgeText={0}
                  isActive={false}
                />
                <Tab value="uda" variant="soft" label="Uda" badgeText={0} />
                <Tab value="history" variant="soft" label="History" />
              </Tabs>

              <hr className="mb-3" />

              <TabPanel value="overview">
                <ActionsCard
                  task={task}
                  onStart={() => updateStatus("start")}
                  onStop={() => updateStatus("stop")}
                  onComplete={() => updateStatus("complete")}
                  onReset={() => updateStatus("reset")}
                />

                <TaskForm.Provider>
                  <TaskForm.Component task={task} softStyle />
                </TaskForm.Provider>

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
              </TabPanel>

              <TabPanel value="annotations">
                <EmptyState
                  className="rounded-md border"
                  Icon={DocumentIcon}
                  title="No Annotations Yet"
                  subtitle="Tasks can contain annotations and they will appear here."
                />
              </TabPanel>

              <TabPanel value="uda">
                <EmptyState
                  className="rounded-md border"
                  Icon={ListBulletIcon}
                  title="No Attributes Yet"
                  subtitle="Tasks can contain user-defined attributes and they will appear here."
                />
              </TabPanel>

              <TabPanel value="history">wip history</TabPanel>
            </TabContext>

            {/* spacer */}
            <div className="h-20" />
          </>
        ) : (
          <EmptyState
            className="!h-full"
            Icon={CursorArrowRaysIcon}
            title="No Task Selected"
            subtitle="Pick one to display its data."
          />
        )}
      </CardBody>
    </Card>
  );
}

function TaskDescriptionForm({ task, onSubmit, onClose }) {
  const formik = useFormik({
    initialValues: { description: task.description },
    onSubmit: async (...args) => {
      const close = await onSubmit(...args);
      if (close) {
        onClose();
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-6 flex items-start justify-between gap-3">
        <Input
          name="description"
          rows={1}
          value={formik.values.description}
          autoFocus
          isRequired
          onChange={formik.handleChange}
          onFocus={(e) => {
            // Move the cursor to the end
            e.target.selectionStart = e.target.value.length;
            e.target.selectionEnd = e.target.value.length;
          }}
        />

        <ButtonList>
          <Button type="submit" isDisabled={formik.isSubmitting}>
            Save
          </Button>
          <Button
            variant="plain"
            isDisabled={formik.isSubmitting}
            onClick={onClose}
          >
            Cancel
          </Button>
        </ButtonList>
      </div>
    </form>
  );
}

function TaskDescription({ task, onSubmit }) {
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    setEditing(false);
  }, [task]);

  if (isEditing) {
    return (
      <TaskDescriptionForm
        task={task}
        onSubmit={onSubmit}
        onClose={() => setEditing(false)}
      />
    );
  }

  return (
    <div className="mb-6 flex items-start justify-between gap-3">
      <Heading2
        className="break-word !mb-0 whitespace-pre-wrap"
        title={task.description}
        subtitle={task.id != 0 && `#${task.id}`}
      />

      <Button onClick={() => setEditing(true)}>Edit</Button>
    </div>
  );
}

function ActionsCard({ task, onStart, onStop, onComplete, onReset }) {
  const status = getRealTaskStatus(task);

  if (status == "deleted") {
    return;
  }

  const getButtons = () => {
    switch (status) {
      case "pending":
        return (
          <>
            <Button
              className="flex-1"
              style={{ flex: 2 }}
              variant="green"
              Icon={PlayIcon}
              onClick={onStart}
            >
              Start task
            </Button>
            <Button
              className="flex-1"
              variant="blue-outline"
              Icon={CheckCircleIcon}
              onClick={onComplete}
            >
              Complete
            </Button>
          </>
        );
      case "in progress":
        return (
          <>
            <Button
              className="flex-1"
              variant="red-outline"
              Icon={StopIcon}
              onClick={onStop}
            >
              Stop
            </Button>
            <Button
              className="flex-1"
              style={{ flex: 2 }}
              variant="blue"
              Icon={CheckCircleIcon}
              onClick={onComplete}
            >
              Complete task
            </Button>
          </>
        );
      case "completed":
        return (
          <Button
            className="flex-1"
            variant="gray"
            Icon={ArrowUturnLeftIcon}
            onClick={onReset}
          >
            Reset task
          </Button>
        );
    }
  };

  return (
    <>
      <Label className="!text-neutral-600" text="Actions" />
      <Card className="border-neutral-300 !bg-neutral-50">
        {getRealTaskStatus(task) === "in progress" && (
          <CardHeader>
            <Timer startDateTime={new Date(task.start + "Z")} />
          </CardHeader>
        )}
        <CardBody className="!px-1.5">
          <ButtonList>{getButtons()}</ButtonList>
        </CardBody>
      </Card>
      <hr className="my-3" />
    </>
  );
}
