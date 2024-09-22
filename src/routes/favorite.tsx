import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/favorite")({
  component: Favorite,
});

function Favorite() {
  return "WIP - Favorite";
}
