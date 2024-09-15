import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/table-view")({
  component: TableView,
});

function TableView() {
  return <div className="p-2">WIP - Table view</div>;
}
