import { ButtonList } from "@/components/custom/button-utils";
import FlexLine from "@/components/custom/flex-line";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  tabs: Tab[];
}

function ActionBar({ tabs }: ActionBarProps) {
  return (
    <FlexLine
      className="border-b pb-2"
      start={
        <Tabs defaultValue={tabs[0].value}>
          <TabsList>
            {tabs.map((tab, index) => (
              <TabsTrigger key={index} value={tab.value}>
                <tab.Icon className="me-2" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      }
      end={
        <ButtonList>
          <Button variant="ghost" size="icon">
            <ListFilterIcon />
          </Button>
          <Button variant="ghost" size="icon">
            <ArrowUpDownIcon />
          </Button>
          <Button variant="ghost" size="icon">
            <SearchIcon />
          </Button>
          <Button variant="ghost" size="icon">
            <GroupIcon />
          </Button>
          <Button>New task</Button>
        </ButtonList>
      }
    />
  );
}

export { ActionBar };
