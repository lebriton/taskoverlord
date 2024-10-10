import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import React, { PropsWithChildren } from "react";

interface GroupProps {
  name: string;
  badge?: React.ReactNode;
}

function Group({ name, badge, children }: PropsWithChildren<GroupProps>) {
  const [open, setOpen] = React.useState(true);

  const Icon = open ? ChevronDownIcon : ChevronRightIcon;

  return (
    <Collapsible className="max-w-full" open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <div
          className="flex cursor-pointer items-center gap-0.5 py-0.5 pe-3 ps-0.5 text-muted-foreground hover:bg-muted/50 active:ring-1 active:ring-inset active:ring-primary/50 data-[open=true]:bg-muted/50"
          data-open={open}
        >
          <Icon className="size-5" />
          <span className="flex-1 text-xs font-semibold uppercase">{name}</span>

          {badge && <span className="rounded-full bg-primary px-1.5 text-xs text-primary-foreground">{badge}</span>}
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="flex flex-col">{children}</CollapsibleContent>
    </Collapsible>
  );
}

export { Group };
