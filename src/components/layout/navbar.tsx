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

        {active && <div className="pointer-events-none absolute inset-0 border-l-2 border-primary" />}
      </Link>
    </TooltipWrapper>
  );
}

export default function Navbar({ groups }: NavbarProps) {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  return (
    <aside
      className="dark flex flex-col bg-background"
      style={{
        "--background": "206.84, 51.35%, 14.51%",
        "--muted-foreground": "0, 0%, 59.61%",
        "--accent-foreground": "0, 0%, 99.61%",
      }}
    >
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
