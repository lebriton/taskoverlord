import { ActionBar } from "@/components/custom/action-bar";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/completed")({
  component: Completed,
});

function Completed() {
  return <ActionBar tabs={[{ label: "Completed", value: "completed" }]} />;
}
