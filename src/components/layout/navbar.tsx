import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DotFilledIcon,
  PlusIcon,
  TriangleDownIcon,
} from "@radix-ui/react-icons";
import { useLocation } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

interface Tab {
  label: string;
  pathname: string;
}

interface NavbarProps {
  tabsList: Tab[];
}

function CreateNew() {
  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <PlusIcon className="mr-2 size-4" />
                <TriangleDownIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent align="end">
            <p>Create new&hellip;</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <DotFilledIcon className="mr-2 size-4" />
            New task
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Navbar({ tabsList }: NavbarProps) {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const navigate = useNavigate({ from: pathname });

  return (
    <header className="w-full border-b p-2 flex items-center justify-between">
      <Tabs value={pathname} onValueChange={(value) => navigate({ to: value })}>
        <TabsList>
          {tabsList.map((item, index) => (
            <TabsTrigger key={index} value={item.pathname}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex h-5 items-center gap-x-4 text-sm">
        <span>wip search bar</span>
        <Separator orientation="vertical" />
        <CreateNew />
      </div>
    </header>
  );
}
