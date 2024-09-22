import { TooltipWrapper } from "../utils";
import { ButtonList } from "@/components/custom/button-utils";
import FlexLine from "@/components/custom/flex-line";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Tab {
  label: string;
  value: string;
  Icon: LucideIcon;
}

interface Action {
  // TODO: fix the type (LucideIcon?)
  Icon: any;
  tooltip: string;
  onClick: (event: any) => void; // TODO: event type
}

interface ActionBarProps {
  className?: string;
  tabs: Tab[];
  actions: Action[];
  onNewTaskCreate: () => void;
}

function ActionBar({
  className,
  tabs,
  actions,
  onNewTaskCreate,
}: ActionBarProps) {
  return (
    <FlexLine
      className={cn("border-b px-3 py-1.5", className)}
      start={
        <Tabs defaultValue={tabs[0].value}>
          <TabsList>
            {tabs.map((tab, index) => (
              <TabsTrigger key={index} value={tab.value}>
                <tab.Icon className="me-2 size-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      }
      end={
        <ButtonList>
          <ButtonList size="sm">
            {actions.map((action, index) => (
              <TooltipWrapper key={index} content={<p>{action.tooltip}</p>}>
                <Button variant="ghost" size="icon_sm" onClick={action.onClick}>
                  <action.Icon className="size-4" />
                </Button>
              </TooltipWrapper>
            ))}
          </ButtonList>

          <Button size="sm" onClick={onNewTaskCreate}>
            New task
          </Button>
        </ButtonList>
      }
    />
  );
}

export { ActionBar };
