import { TaskList } from "../features/task-list";
import { ActionBar } from "@/components/features/action-bar";
import { Task, TaskStatus } from "@/types/task";
import {
  ArrowUpDownIcon,
  EyeIcon,
  GroupIcon,
  ListFilterIcon,
  SearchIcon,
} from "lucide-react";
import { Columns3Icon, ListIcon } from "lucide-react";
import * as React from "react";

const actionTabs = [
  {
    label: "Kanban",
    value: "kanban",
    Icon: Columns3Icon,
  },
  {
    label: "List",
    value: "list",
    Icon: ListIcon,
  },
];

const wipTasks: Task[] = [
  {
    id: 1,
    description: "Complete project proposal",
    due: new Date("2024-09-25"),
    favorite: false,
    status: TaskStatus.IN_PROGRESS,
  },
  {
    id: 2,
    description: "Review team feedback",
    favorite: false,
    status: TaskStatus.PENDING,
  },
  {
    id: 3,
    description: "Update project timeline",
    favorite: false,
    status: TaskStatus.IN_PROGRESS,
  },
  {
    id: 4,
    description: "Prepare presentation slides",
    favorite: false,
    status: TaskStatus.WAITING,
  },
  {
    id: 5,
    description: "Send meeting invites",
    due: new Date("2024-09-29"),
    favorite: true,
    status: TaskStatus.COMPLETED,
  },
  {
    id: 6,
    description: "Draft budget report",
    favorite: false,
    status: TaskStatus.COMPLETED,
  },
  {
    id: 7,
    description: "Organize team workshop",
    due: new Date("2024-10-01"),
    favorite: true,
    status: TaskStatus.WAITING,
  },
  {
    id: 8,
    description: "Finalize project requirements",
    favorite: false,
    status: TaskStatus.COMPLETED,
  },
  {
    id: 9,
    description: "Conduct stakeholder interviews",
    due: new Date("2024-10-03"),
    favorite: false,
    status: TaskStatus.IN_PROGRESS,
  },
  {
    id: 10,
    description: "Review legal documents",
    favorite: false,
    status: TaskStatus.IN_PROGRESS,
  },
  // New tasks
  {
    id: 11,
    description: "Analyze market trends",
    favorite: false,
    status: TaskStatus.PENDING,
  },
  {
    id: 12,
    description: "Set up team collaboration tools",
    due: new Date("2024-10-06"),
    favorite: true,
    status: TaskStatus.IN_PROGRESS,
  },
  {
    id: 13,
    description: "Prepare for client presentation",
    favorite: false,
    status: TaskStatus.PENDING,
  },
  {
    id: 14,
    description: "Conduct performance reviews",
    favorite: false,
    status: TaskStatus.PENDING,
  },
  {
    id: 15,
    description: "Write project documentation",
    favorite: true,
    status: TaskStatus.IN_PROGRESS,
  },
  {
    id: 16,
    description: "Implement feedback from clients",
    due: new Date("2024-10-10"),
    favorite: false,
    status: TaskStatus.COMPLETED,
  },
  {
    id: 17,
    description: "Host team-building event",
    due: new Date("2024-10-11"),
    favorite: false,
    status: TaskStatus.PENDING,
  },
  {
    id: 18,
    description: "Launch marketing campaign",
    due: new Date("2024-10-12"),
    favorite: true,
    status: TaskStatus.PENDING,
  },
  {
    id: 19,
    description: "Evaluate project outcomes",
    favorite: false,
    status: TaskStatus.PENDING,
  },
  {
    id: 20,
    description: "Prepare year-end financial report",
    due: new Date("2024-10-14"),
    favorite: false,
    status: TaskStatus.PENDING,
  },
];

const actionActions = [
  {
    Icon: ListFilterIcon,
    tooltip: "Filter",
    onClick: () => null,
  },
  {
    Icon: ArrowUpDownIcon,
    tooltip: "Sort",
    onClick: () => null,
  },
  {
    Icon: SearchIcon,
    tooltip: "Search",
    onClick: () => null,
  },
  {
    Icon: GroupIcon,
    tooltip: "Group by",
    onClick: () => null,
  },
  {
    Icon: EyeIcon,
    tooltip: "Modify visibility",
    onClick: () => null,
  },
];

export default function MainContent() {
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);

  const handleTaskSelect = (task: Task | null) => {
    setSelectedTask(task);
  };

  const handleNewTaskCreate = () => {};

  return (
    <div className="flex max-h-full flex-col">
      <ActionBar
        tabs={actionTabs}
        actions={actionActions}
        onNewTaskCreate={handleNewTaskCreate}
      />

      <TaskList
        tasks={wipTasks}
        selectedTask={selectedTask}
        onTaskSelect={handleTaskSelect}
      />
    </div>
  );
}
