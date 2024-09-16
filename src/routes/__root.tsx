import Navbar from "@/components/layout/navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import {
  ArrowBigRightDash,
  CircleCheckBig,
  HomeIcon,
  InboxIcon,
  SettingsIcon,
  TagIcon,
} from "lucide-react";

export const Route = createRootRoute({
  component: Root,
});

const navItems = [
  [
    {
      label: "Inbox",
      to: "/",
      Icon: InboxIcon,
    },
    {
      label: "Next",
      to: "/next",
      Icon: ArrowBigRightDash,
    },
    {
      label: "Projects",
      to: "/projects",
      Icon: HomeIcon,
    },
    {
      label: "Tags",
      to: "/tags",
      Icon: TagIcon,
    },
    {
      label: "Completed",
      to: "/completed",
      Icon: CircleCheckBig,
    },
  ],
  [
    {
      label: "Settings",
      to: "/settings",
      Icon: SettingsIcon,
    },
  ],
];

function Root() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Navbar groups={navItems} />
        <div className="flex flex-col gap-4 py-4 pl-14">
          <Outlet />
        </div>
      </div>

      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
