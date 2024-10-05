import FlexLine from "@/components/custom/flex-line";
import { Button } from "@/components/ui/button";
import { FakeTabsTrigger, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ButtonList } from "@/components/utils/button-utils";
import { TooltipWrapper } from "@/components/utils/tooltip-utils";
import { cn } from "@/lib/utils";

interface Tab {
  label: string;
  value: string;
}

interface IconButtonAction {
  // TODO: fix the type (LucideIcon?)
  Icon: any;
  tooltip: string;
  onClick: (event: any) => void; // TODO: event type
}

interface TextButtonAction {
  label: string;
  onClick: (event: any) => void; // TODO: event type
}

interface ActionBarProps {
  className?: string;
  tabs: Tab[];
  iconButtonActions?: IconButtonAction[];
  textButtonActions?: TextButtonAction[];
}

function ActionBar({ className, tabs, iconButtonActions = [], textButtonActions = [] }: ActionBarProps) {
  return (
    <FlexLine
      className={cn("pe-3 ps-5", className)}
      start={
        tabs.length === 1 ? (
          <FakeTabsTrigger>{tabs[0].label}</FakeTabsTrigger>
        ) : (
          <Tabs defaultValue={tabs[0].value}>
            <TabsList>
              {tabs.map((tab, index) => (
                <TabsTrigger key={index} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )
      }
      end={
        <ButtonList>
          <ButtonList size="sm">
            {iconButtonActions.map((action, index) => (
              <TooltipWrapper key={index} content={<p>{action.tooltip}</p>}>
                <Button variant="ghost" size="icon" onClick={action.onClick}>
                  <action.Icon className="text-muted-foreground" />
                </Button>
              </TooltipWrapper>
            ))}
          </ButtonList>

          {textButtonActions.map((action, index) => (
            <Button key={index} size="sm" onClick={action.onClick}>
              {action.label}
            </Button>
          ))}
        </ButtonList>
      }
    />
  );
}

export { ActionBar };
