import { ButtonList } from "@/components/custom/button-utils";
import FlexLine from "@/components/custom/flex-line";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  ArrowUpDownIcon,
  GroupIcon,
  ListFilterIcon,
  LucideIcon,
  SearchIcon,
} from "lucide-react";

interface Tab {
  label: string;
  value: string;
  Icon: LucideIcon;
}

interface ActionBarProps {
  className?: string;
  tabs: Tab[];
}

function ActionBar({ className, tabs }: ActionBarProps) {
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
            <Button variant="ghost" size="icon_sm">
              <ListFilterIcon className="size-4" />
            </Button>
            <Button variant="ghost" size="icon_sm">
              <ArrowUpDownIcon className="size-4" />
            </Button>
            <Button variant="ghost" size="icon_sm">
              <SearchIcon className="size-4" />
            </Button>
            <Button variant="ghost" size="icon_sm">
              <GroupIcon className="size-4" />
            </Button>
          </ButtonList>

          <Button size="sm">New task</Button>
        </ButtonList>
      }
    />
  );
}

export { ActionBar };
