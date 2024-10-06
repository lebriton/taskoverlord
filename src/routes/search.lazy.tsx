import { ActionBar } from "@/components/custom/action-bar";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/search")({
  component: Search,
});

function Search() {
  return <ActionBar tabs={[{ label: "Search", value: "search" }]} />;
}
