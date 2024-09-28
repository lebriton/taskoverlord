import { TooltipWrapper } from "@/components/utils/tooltip-utils";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  to: string;
  Icon: LucideIcon;
  active: boolean;
  tooltip: string;
}

interface NavbarItem {
  to: string;
  // TODO: fix the type (LucideIcon?)
  Icon: any;
  tooltip: string;
}

type NavbarGroup = NavbarItem[];

interface NavbarProps {
  groups: NavbarGroup[];
}

function NavItem({ to, Icon, tooltip, active }: NavItemProps) {
  return (
    <TooltipWrapper content={<p>{tooltip}</p>} side="right">
      <Link
        to={to}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground md:h-8 md:w-8",
          "data-[status=active]:bg-accent data-[status=active]:text-accent-foreground",
        )}
        data-active={active}
      >
        <Icon className="h-5 w-5" />
        <span className="sr-only">{tooltip}</span>
      </Link>
    </TooltipWrapper>
  );
}

export default function Navbar({ groups }: NavbarProps) {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  return (
    <aside className="flex w-14 flex-col bg-background">
      {groups.map((group, index) => (
        <nav key={index} className={cn("flex flex-col items-center gap-4 px-2 py-4", index > 0 && "mt-auto")}>
          {group.map((item, index) => (
            <NavItem key={index} {...item} active={item.to === pathname} />
          ))}
        </nav>
      ))}
    </aside>
  );
}
