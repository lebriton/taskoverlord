import { TaskList } from "../features/task-list";
import { ActionBar } from "@/components/features/action-bar";
import { Task, TaskStatus } from "@/types/task";
import { Columns3Icon, ListIcon } from "lucide-react";

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
    due: new Date("2024-09-26"),
    favorite: false,
    status: TaskStatus.PENDING,
  },
  {
    id: 3,
    description: "Update project timeline",
    due: new Date("2024-09-27"),
    favorite: false,
    status: TaskStatus.IN_PROGRESS,
  },
  {
    id: 4,
    description: "Prepare presentation slides",
    due: new Date("2024-09-28"),
    favorite: false,
    status: TaskStatus.PENDING,
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
    due: new Date("2024-09-30"),
    favorite: false,
    status: TaskStatus.COMPLETED,
  },
  {
    id: 7,
    description: "Organize team workshop",
    due: new Date("2024-10-01"),
    favorite: true,
    status: TaskStatus.PENDING,
  },
  {
    id: 8,
    description: "Finalize project requirements",
    due: new Date("2024-10-02"),
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
    due: new Date("2024-10-04"),
    favorite: false,
    status: TaskStatus.IN_PROGRESS,
  },
  // New tasks
  {
    id: 11,
    description: "Analyze market trends",
    due: new Date("2024-10-05"),
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
    due: new Date("2024-10-07"),
    favorite: false,
    status: TaskStatus.PENDING,
  },
  {
    id: 14,
    description: "Conduct performance reviews",
    due: new Date("2024-10-08"),
    favorite: false,
    status: TaskStatus.PENDING,
  },
  {
    id: 15,
    description: "Write project documentation",
    due: new Date("2024-10-09"),
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
    due: new Date("2024-10-13"),
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

export default function MainContent() {
  return (
    <div className="flex max-h-full flex-col">
      <ActionBar tabs={actionTabs} />

      <TaskList tasks={wipTasks} />
    </div>
  );
}
