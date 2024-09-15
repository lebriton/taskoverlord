import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/gantt-diagram")({
  component: GanttDiagram,
});

function GanttDiagram() {
  return <div className="p-2">WIP - Gantt diagram</div>;
}
