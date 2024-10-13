import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import React, { PropsWithChildren } from "react";

interface GroupProps {
  className?: string;
  name: string | null;
  badge?: React.ReactNode;
}

function Group({ className, name, badge, children }: PropsWithChildren<GroupProps>) {
  const [open, setOpen] = React.useState(true);

  const Icon = open ? ChevronDownIcon : ChevronRightIcon;

  return (
    <Collapsible className="max-w-full" open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <div
          className={cn(
            "flex cursor-pointer items-center gap-0.5 py-0.5 pe-3 ps-0.5 text-xs text-muted-foreground hover:bg-muted/50 hover:text-foreground active:ring-1 active:ring-inset active:ring-primary/50 data-[open=true]:bg-muted/50 data-[state=open]:text-foreground",
            className,
          )}
          data-open={open}
        >
          <Icon className="size-5" />
          <span className={cn("flex-1 font-semibold uppercase", { italic: !name })}>{name || "No group"}</span>

          {badge && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">{badge}</span>
          )}
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="flex flex-col">{children}</CollapsibleContent>
    </Collapsible>
  );
}

function GroupList({ children }: PropsWithChildren) {
  return <div className="flex-container flex-col divide-y">{children}</div>;
}

export { Group, GroupList };
