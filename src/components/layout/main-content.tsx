import { ActionBar } from "@/components/features/action-bar";
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

export default function MainContent() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <ActionBar tabs={actionTabs} />
      WIP - Main content
    </div>
  );
}
