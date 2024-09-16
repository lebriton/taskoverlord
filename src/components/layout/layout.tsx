import Navbar from "@/components/layout/navbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  ArrowBigRightDash,
  CircleCheckBig,
  HomeIcon,
  InboxIcon,
  SettingsIcon,
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

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Navbar groups={navItems} />

      <ResizablePanelGroup
        direction="horizontal"
        className="pl-14 min-h-screen"
      >
        <ResizablePanel defaultSize={25} minSize={15} maxSize={30}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Workbench</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>{children}</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">AuxiliaryBar</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
