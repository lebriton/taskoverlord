import FlexLine from "@/components/custom/flex-line";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ButtonList } from "@/components/utils/button-utils";
import { TooltipWrapper } from "@/components/utils/tooltip-utils";
import { cn } from "@/lib/utils";

interface Tab {
  label: string;
  value: string;
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

function ActionBar({ className, tabs, actions, onNewTaskCreate }: ActionBarProps) {
  return (
    <FlexLine
      className={cn("mb-3 pe-3 ps-5", className)}
      start={
        <Tabs defaultValue={tabs[0].value}>
          <TabsList>
            {tabs.map((tab, index) => (
              <TabsTrigger key={index} value={tab.value}>
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
                <Button variant="ghost" size="icon" onClick={action.onClick}>
                  <action.Icon className="text-muted-foreground" />
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
