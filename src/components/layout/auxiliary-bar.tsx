import { Separator } from "../ui/separator";
import { ButtonList } from "../utils/button-utils";
import { EmptyState } from "@/components/custom/empty-state";
import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/utils/tooltip-utils";
import { ChevronDownIcon, ChevronsRightIcon, ChevronUpIcon } from "lucide-react";

export default function AuxiliaryBar() {
  return (
    <div className="flex size-full flex-col gap-1.5 bg-muted/40 px-3 py-1.5 text-muted-foreground">
      <ButtonList>
        <TooltipWrapper content={<p>Close</p>}>
          <Button variant="ghost" size="icon">
            <ChevronsRightIcon />
          </Button>
        </TooltipWrapper>

        <Separator className="h-5" orientation="vertical" />

        <ButtonList size="sm">
          <TooltipWrapper content={<p>Previous task</p>}>
            <Button variant="ghost" size="icon">
              <ChevronUpIcon />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper content={<p>Next task</p>}>
            <Button variant="ghost" size="icon">
              <ChevronDownIcon />
            </Button>
          </TooltipWrapper>
        </ButtonList>
      </ButtonList>

      <EmptyState title="No items selected" subtitle="Pick a task to display and modify its data." />
    </div>
  );
}
