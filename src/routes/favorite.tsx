import { ActionBar } from "@/components/custom/action-bar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/favorite")({
  component: Favorite,
});

function Favorite() {
  return <ActionBar tabs={[{ label: "Favorite", value: "favorite" }]} />;
}
