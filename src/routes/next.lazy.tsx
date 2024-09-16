import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/next")({
  component: Next,
});

function Next() {
  return "WIP - Next";
}
