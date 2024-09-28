import AuxiliaryBar from "./auxiliary-bar";
import CalendarStripe from "./calendar-stripe";
import MainContent from "./main-content";
import Workbench from "./workbench";
import Navbar from "@/components/layout/navbar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  ArrowBigRightDash,
  CircleCheckBig,
  FoldersIcon,
  InboxIcon,
  SettingsIcon,
  StarIcon,
  TagIcon,
} from "lucide-react";
import { PropsWithChildren } from "react";

const navItems = [
  [
    {
      to: "/",
      Icon: InboxIcon,
      tooltip: "Inbox",
    },
    {
      to: "/favorite",
      Icon: StarIcon,
      tooltip: "Favorites",
    },
    {
      to: "/search",
      Icon: MagnifyingGlassIcon,
      tooltip: "Search",
    },
    {
      to: "/next",
      Icon: ArrowBigRightDash,
      tooltip: "Next",
    },
    {
      to: "/projects",
      Icon: FoldersIcon,
      tooltip: "Projects",
    },
    {
      to: "/tags",
      Icon: TagIcon,
      tooltip: "Tags",
    },
    {
      to: "/completed",
      Icon: CircleCheckBig,
      tooltip: "Completed",
    },
  ],
  [
    {
      to: "/settings",
      Icon: SettingsIcon,
      tooltip: "Settings",
    },
  ],
];

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-screen overflow-clip">
      <Navbar groups={navItems} />

      <ResizablePanelGroup className="flex-1" direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={80}>
          <Workbench>{children}</Workbench>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel className="flex flex-col">
          <div className="shrink-0">
            <CalendarStripe />
          </div>

          <div className="flex flex-1 overflow-hidden">
            <div className="grow">
              <MainContent />
            </div>

            <div className="w-80 border-s">
              <AuxiliaryBar />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
