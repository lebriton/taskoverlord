import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/kanban-board")({
  component: KanbanBoard,
});

function KanbanBoard() {
  return <div className="p-2">WIP - Kanban board</div>;
}
