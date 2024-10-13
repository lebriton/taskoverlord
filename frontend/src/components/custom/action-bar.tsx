import FlexLine from "@/components/custom/flex-line";
import { FakeTabsTrigger, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Action, ActionButtons } from "@/components/utils/button-utils";
import { cn } from "@/lib/utils";

interface Tab {
  label: string;
  value: string;
}

interface ActionBarProps {
  className?: string;
  tabs: Tab[];
  actions?: Action[];
}

function ActionBar({ className, tabs, actions = [] }: ActionBarProps) {
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
      end={actions.length > 0 && <ActionButtons actions={actions} />}
    />
  );
}

export { ActionBar };
