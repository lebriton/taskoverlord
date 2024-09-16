import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/completed")({
  component: Completed,
});

function Completed() {
  return "WIP - Completed";
}
