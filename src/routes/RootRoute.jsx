import React, { useEffect, useState } from "react";
import TaskDetails from "../components/organisms/TaskDetails";
import {
  TableCellsIcon,
  ViewColumnsIcon,
  Bars3BottomRightIcon,
  FunnelIcon,
  CalendarDaysIcon,
  PlusCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import Tabs, { Tab, TabContext } from "../components/organisms/Tabs";
import { getRealTaskStatus } from "../utils";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/tauri";
import Badge, { BadgeList } from "../components/atoms/Badge";
import { Outlet } from "react-router-dom";
import FlexLine from "../components/molecules/FlexLine";
import Button, { ButtonList } from "../components/atoms/Button";
import BottomBar from "../components/organisms/BottomBar";
import Checkbox from "../components/molecules/Checkbox";
import Terminal from "../components/organisms/Terminal";
import NewTask from "../components/organisms/NewTask";
import Input from "../components/atoms/Input";
import Label from "../components/atoms/Label";
import { useToast } from "../contexts/ToastContext";
import Anchor from "../components/atoms/Anchor";
import FormGroup from "../components/atoms/FormGroup";
import FilterDropdownCardForm from "../components/organisms/FilterDropdownCardForm";

export default function RootRoute() {
  const queryClient = useQueryClient();
  const tasksQuery = useSuspenseQuery({
    queryKey: ["tasks"],
    // TODO: handle errors
    queryFn: async () => await invoke("get_all_tasks"),
    defaultValue: [],
  });
  const [filters, setFilters] = useState({
    status: ["pending", "waiting", "in progress", "completed"],
  });
  const filteredTasks = tasksQuery.data.filter((task) =>
    filters.status.includes(getRealTaskStatus(task)),
  );

  const [previousTask, setPreviousTask] = useState(null);
  const [selectedUuid, setSelectedUuid] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [nextTask, setNextTask] = useState(null);

  useEffect(() => {
    let task = null;
    const tasks = filteredTasks;

    if (selectedUuid) {
      task = tasks?.find((task) => task.uuid === selectedUuid);
      setSelectedTask(task || null);
    } else {
      setSelectedTask(null);
    }

    if (task) {
      const currentIndex = filteredTasks.indexOf(task);
      if (currentIndex === -1) {
        setPreviousTask(null);
        setNextTask(null);
      } else {
        setPreviousTask(currentIndex > 0 ? tasks[currentIndex - 1] : null);
        setNextTask(
          currentIndex < tasks.length - 1 ? tasks[currentIndex + 1] : null,
        );
      }
    }
  }, [selectedUuid, filteredTasks]);

  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showNewTask, setShowNewTask] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  const hideTaskDetails = () => {
    setShowTaskDetails(false);

    setPreviousTask(null);
    setSelectedUuid(null);
    setNextTask(null);
  };

  const displayTaskDetails = (thing) => {
    if (typeof thing === "string") setSelectedUuid(thing);
    else setSelectedUuid(thing.uuid);
    setShowTaskDetails(true);
  };

  const toggleTaskDetailsVisibility = () => {
    if (showTaskDetails) {
      hideTaskDetails();
    } else {
      displayTaskDetails(null);
    }
  };

  const links = [
    {
      value: "table",
      label: (
        <span className="hidden 2xl:inline">
          Table <span className="hidden 4xl:inline">View</span>
        </span>
      ),
      url: "/",
      Icon: TableCellsIcon,
      shortcut: "t",
    },
    {
      value: "kaban",
      label: (
        <span className="hidden 2xl:inline">
          Kanban <span className="hidden 4xl:inline">Board</span>
        </span>
      ),
      url: "/",
      Icon: ViewColumnsIcon,
      shortcut: "k",
    },
    {
      value: "gantt",
      label: (
        <span className="hidden 2xl:inline">
          Gantt <span className="hidden 4xl:inline">Diagram</span>
        </span>
      ),
      url: "/",
      Icon: Bars3BottomRightIcon,
      shortcut: "g",
    },
    {
      value: "calendar",
      label: <span className="hidden 2xl:inline">Calendar</span>,
      url: "/",
      Icon: CalendarDaysIcon,
      shortcut: "c",
    },
  ];

  // const projectsQuery = useSuspenseQuery({
  //   queryKey: ["projects"],
  //   // TODO: handle errors
  //   queryFn: async () => await invoke("get_project_names"),
  // });
  // const projects = projectsQuery.data.map((project, idx) => ({
  //   text: project,
  //   shortcut: (idx + 1).toString(),
  // }));

  const addToast = useToast();

  return (
    <>
      <div className="flex h-screen w-screen flex-col overflow-hidden">
        <FlexLine
          className="z-20 gap-4 border-b px-2"
          left={
            <TabContext defaultValue="table">
              <Tabs>
                {links.map((link, idx) => (
                  <Tab
                    key={idx}
                    className="!py-2"
                    value={link.value}
                    label={link.label}
                    onClick={() => link.url}
                    Icon={link.Icon}
                    shortcutText={link.shortcut}
                  />
                ))}
              </Tabs>
            </TabContext>
          }
          center={
            <Input
              Icon={MagnifyingGlassIcon}
              placeholder="Search Taskoverlord"
            />
          }
          right={
            <div className="flex items-center justify-end gap-2">
              <Label
                className="!mb-0"
                text={<span className="hidden 2xl:inline">Tasks</span>}
                badgeText={filteredTasks.length}
              />

              <Button
                Icon={ArrowPathIcon}
                variant="plain"
                shortcutText="r"
                onClick={() => {
                  queryClient.invalidateQueries({ queryKey: ["tasks"] });
                  addToast("All tasks have been refreshed.", "success");
                }}
              />

              <ButtonList>
                <Button
                  Icon={FunnelIcon}
                  shortcutText="f"
                  dropdown={({ onClose }) => (
                    <FilterDropdownCardForm
                      filters={filters}
                      onSubmit={setFilters}
                      onClose={onClose}
                    />
                  )}
                >
                  <span className="hidden 2xl:inline">Filter</span>
                  <CountTasksByStatus tasks={filteredTasks} />
                </Button>
                <Button
                  variant="green"
                  Icon={PlusCircleIcon}
                  shortcutText="a"
                  isDisabled={showNewTask}
                  onClick={() => setShowNewTask(true)}
                >
                  <span className="hidden 2xl:inline">New task</span>
                </Button>
              </ButtonList>
            </div>
          }
        />

        <div className="flex flex-1 grow divide-x overflow-clip">
          <div className="grow overflow-clip bg-neutral-50">
            <Outlet
              context={[filteredTasks, selectedTask, displayTaskDetails]}
            />
          </div>

          {showTaskDetails && (
            <div className="min-w-96 max-w-96 overflow-clip">
              <TaskDetails
                task={selectedTask}
                onSubmit={(values) =>
                  invoke("modify_task", {
                    taskUuid: selectedTask.uuid,
                    description: values.description,
                  })
                    .then(() => {
                      queryClient.invalidateQueries({ queryKey: ["tasks"] });
                      addToast("Task description updated.", "success");
                      // always close
                      return true;
                    })
                    .catch((error) =>
                      addToast(`An error occured: ${error}`, "error"),
                    )
                }
                onClose={hideTaskDetails}
                onPreviousTaskClick={
                  previousTask ? () => displayTaskDetails(previousTask) : null
                }
                onNextTaskClick={
                  nextTask ? () => displayTaskDetails(nextTask) : null
                }
              />
            </div>
          )}
        </div>

        <Terminal
          className="flex-1 overflow-clip border-t"
          show={showTerminal}
        />

        <BottomBar
          isCommandsActive={showTerminal}
          onCommandsClick={() => setShowTerminal(!showTerminal)}
        />

        {showNewTask && (
          <div className="fixed bottom-0 right-0 top-0 z-40 min-w-96 max-w-96 overflow-clip border-l bg-white shadow-2xl">
            <NewTask
              onSubmit={(values, actions) =>
                invoke("add_task", {
                  description: values.description,
                  alreadyCompleted: values.already_completed,
                })
                  .then((new_task_uuid) => {
                    queryClient.invalidateQueries({ queryKey: ["tasks"] });
                    actions.setSubmitting(false);
                    addToast(
                      `New task '${values.description}' added.`,
                      "success",
                    );

                    displayTaskDetails(new_task_uuid);

                    // should close?
                    return !values.continueEditing;
                  })
                  .catch((error) =>
                    addToast(`An error occured: ${error}`, "error"),
                  )
              }
              onClose={() => setShowNewTask(false)}
            />
          </div>
        )}
      </div>
    </>
  );
}

function CountTasksByStatus({ tasks }) {
  const count = {};
  tasks.forEach((task) => {
    let status = getRealTaskStatus(task);
    count[status] = (count[status] || 0) + 1;
  });

  return (
    <BadgeList className="!flex-nowrap">
      {count["pending"] && <Badge text={count["pending"]} variant="gray" />}
      {count["waiting"] && <Badge text={count["waiting"]} variant="indigo" />}
      {count["in progress"] && (
        <Badge text={count["in progress"]} variant="yellow" />
      )}
      {count["completed"] && (
        <Badge text={count["completed"]} variant="green" />
      )}
      {count["deleted"] && <Badge text={count["deleted"]} variant="red" />}
    </BadgeList>
  );
}
