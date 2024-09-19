import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  label: string;
  to: string;
  Icon: LucideIcon;
  active: boolean;
}

interface NavbarItem extends Omit<NavItemProps, "active"> {}

type NavbarGroup = NavbarItem[];

interface NavbarProps {
  groups: NavbarGroup[];
}

function NavItem({ label, to, Icon, active }: NavItemProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={to}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
              "data-[status=active]:bg-accent data-[status=active]:text-accent-foreground",
            )}
            data-active={active}
          >
            <Icon className="h-5 w-5" />
            <span className="sr-only">{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function Navbar({ groups }: NavbarProps) {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  return (
    <aside className="flex w-14 flex-col border-r bg-background">
      {groups.map((group, index) => (
        <nav
          key={index}
          className={cn(
            "flex flex-col items-center gap-4 px-2 py-4",
            index > 0 && "mt-auto",
          )}
        >
          {group.map((item, index) => (
            <NavItem key={index} {...item} active={item.to === pathname} />
          ))}
        </nav>
      ))}
    </aside>
  );
}
