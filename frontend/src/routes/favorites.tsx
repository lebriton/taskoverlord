import { ActionBar } from "@/components/custom/action-bar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/favorites")({
  component: Favorites,
});

function Favorites() {
  return <ActionBar tabs={[{ label: "Favorites", value: "favorites" }]} />;
}
