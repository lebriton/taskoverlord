import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/projects")({
  component: Projects,
});

function Projects() {
  return "WIP - Projects";
}
