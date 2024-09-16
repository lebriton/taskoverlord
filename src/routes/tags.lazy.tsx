import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/tags")({
  component: Tags,
});

function Tags() {
  return "WIP - Tags";
}
