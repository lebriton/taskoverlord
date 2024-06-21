import React, { useEffect, useState } from "react";
import TaskDetails from "../components/organisms/TaskDetails";
import Fuse from "fuse.js";
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
import FilterDropdownCardForm, {
  countFilters,
} from "../components/organisms/FilterDropdownCardForm";

export default function RootRoute() {
  const queryClient = useQueryClient();
  const tasksQuery = useSuspenseQuery({
    queryKey: ["tasks"],
    // TODO: handle errors
    queryFn: async () => await invoke("get_all_tasks"),
    defaultValue: [],
  });
  const [filters, setFilters] = useState({
    description: "",
    status: ["pending", "waiting", "in progress", "completed"],
  });
  const filtersCount = countFilters(filters);
  const tasks = tasksQuery.data;
  const filteredTasks = filterTasks(tasks, filters);

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
              <Button
                Icon={ArrowPathIcon}
                variant="plain"
                shortcutText="r"
                onClick={() => {
                  queryClient.invalidateQueries({ queryKey: ["tasks"] });
                  addToast("All tasks have been refreshed.", "info");
                }}
              />

              <ButtonList>
                <div>
                  <Button
                    Icon={FunnelIcon}
                    shortcutText="f"
                    dropdown={({ onClose }) => (
                      <FilterDropdownCardForm
                        tasks={tasks}
                        filteredTasks={filteredTasks}
                        filters={filters}
                        onSubmit={(filters) => {
                          setFilters(filters);
                          // TODO: pluralize
                          addToast(
                            `${countFilters(filters)} filters applied.`,
                            "info",
                          );
                        }}
                        onClose={onClose}
                      />
                    )}
                  >
                    <span className="hidden 2xl:inline">
                      Filters
                      {filtersCount !== 0 && ` (${filtersCount})`}
                    </span>
                  </Button>
                </div>

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
                  alreadyCompleted: values.alreadyCompleted,
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

function filterTasks(tasks, filters) {
  let output = tasks.map((task) => {
    task._descriptionMatches = "";
    return task;
  });

  if (countFilters(filters) > 0)
    output = output.filter((task) => {
      return filters.status.includes(getRealTaskStatus(task));
    });

  if (filters.description) {
    const fuse = new Fuse(output, {
      keys: ["description"],
      includeMatches: true,
      threshold: 0.4,
    });

    output = fuse.search(filters.description).map(({ item, matches }) => {
      item._descriptionMatches = matches;
      return item;
    });
  }

  return output;
}
