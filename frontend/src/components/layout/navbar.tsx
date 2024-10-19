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
        className="relative flex size-12 items-center justify-center text-muted-foreground hover:text-accent-foreground data-[status=active]:text-accent-foreground"
        data-active={active}
      >
        <Icon className="size-6" />

        {active && (
          <div className="pointer-events-none absolute inset-0 w-1 rounded-ee-full rounded-se-full bg-accent-foreground" />
        )}
      </Link>
    </TooltipWrapper>
  );
}

export default function Navbar({ groups }: NavbarProps) {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  return (
    <aside className="dark flex flex-col bg-muted">
      {groups.map((group, index) => (
        <nav key={index} className={cn("flex flex-col items-center", index > 0 && "mt-auto")}>
          {group.map((item, index) => (
            <NavItem key={index} {...item} active={item.to === pathname} />
          ))}
        </nav>
      ))}
    </aside>
  );
}
