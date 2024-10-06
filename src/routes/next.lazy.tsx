import { ActionBar } from "@/components/custom/action-bar";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/next")({
  component: Next,
});

function Next() {
  return <ActionBar tabs={[{ label: "Next", value: "next" }]} />;
}
