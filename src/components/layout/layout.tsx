import AuxiliaryBar from "./auxiliary-bar";
import MainContent from "./main-content";
import Timeline from "./timeline";
import Workbench from "./workbench";
import Navbar from "@/components/layout/navbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
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
      label: "Inbox",
      to: "/",
      Icon: InboxIcon,
    },
    {
      label: "Favorite",
      to: "/favorite",
      Icon: StarIcon,
    },
    {
      label: "Search",
      to: "/search",
      Icon: MagnifyingGlassIcon,
    },
    {
      label: "Next",
      to: "/next",
      Icon: ArrowBigRightDash,
    },
    {
      label: "Projects",
      to: "/projects",
      Icon: FoldersIcon,
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

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex max-h-screen min-h-screen w-full">
      <Navbar groups={navItems} />

      <div className="grow">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={80}>
            <Workbench>{children}</Workbench>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel>
            <div className="flex size-full flex-col">
              <Timeline />

              <div className="flex size-full">
                <div className="grow">
                  <MainContent />
                </div>

                <div className="w-80 border-s">
                  <AuxiliaryBar />
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
