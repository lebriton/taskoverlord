import AuxiliaryBar from "./auxiliary-bar";
import CalendarStripe from "./calendar-stripe";
import PrimaryContent from "./primary-content";
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
    <div className="h-screen w-screen overflow-clip">
      <ResizablePanelGroup direction="horizontal">
        <Navbar groups={navItems} />

        <ResizablePanel
          className="border-l data-[panel-size='0.0']:border-l-0"
          defaultSize={20}
          minSize={15}
          maxSize={85}
          collapsible
        >
          <Workbench>{children}</Workbench>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <PrimaryContent />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="shadow-2xl" defaultSize={25} minSize={25} maxSize={50} collapsible>
          <AuxiliaryBar />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
