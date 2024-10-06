import { ActionBar } from "@/components/custom/action-bar";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/tags")({
  component: Tags,
});

function Tags() {
  return <ActionBar tabs={[{ label: "Tags", value: "tags" }]} />;
}
