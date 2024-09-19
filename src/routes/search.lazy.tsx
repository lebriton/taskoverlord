import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/search")({
  component: Search,
});

function Search() {
  return "WIP - Search";
}
