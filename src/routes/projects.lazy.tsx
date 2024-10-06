import { ActionBar } from "@/components/custom/action-bar";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/projects")({
  component: Projects,
});

function Projects() {
  return <ActionBar tabs={[{ label: "Projects", value: "projects" }]} />;
}
