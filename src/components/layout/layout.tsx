import AuxiliaryBar from "./auxiliary-bar";
import PrimaryContent from "./primary-content";
import Workbench from "./workbench";
import Navbar from "@/components/layout/navbar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { StarIcon, FolderIcon, TagIcon, InboxIcon, Cog8ToothIcon } from "@heroicons/react/24/solid";
import { SearchIcon, ArrowBigRightDash, CircleCheckBig } from "lucide-react";
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
      Icon: SearchIcon,
      tooltip: "Search",
    },
    {
      to: "/next",
      Icon: ArrowBigRightDash,
      tooltip: "Next",
    },
    {
      to: "/projects",
      Icon: FolderIcon,
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
      Icon: Cog8ToothIcon,
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
          style={{
            "--border": "204.21, 65.52%, 17.06%",
          }}
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
        <ResizablePanel defaultSize={25} minSize={25} maxSize={50} collapsible>
          <AuxiliaryBar />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
