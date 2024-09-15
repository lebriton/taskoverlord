import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/calendar")({
  component: Calendar,
});

function Calendar() {
  return <div className="p-2">WIP - Calendar</div>;
}
