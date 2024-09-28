import { Separator } from "../ui/separator";
import { ButtonList } from "../utils/button-utils";
import { EmptyState } from "@/components/custom/empty-state";
import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/utils/tooltip-utils";
import { ChevronDownIcon, ChevronsRightIcon, ChevronUpIcon } from "lucide-react";

export default function AuxiliaryBar() {
  return (
    <div className="flex size-full flex-col gap-3 p-3">
      <ButtonList size="sm">
        <TooltipWrapper content={<p>Close</p>}>
          <Button variant="ghost" size="icon_xs">
            <ChevronsRightIcon className="size-5" />
          </Button>
        </TooltipWrapper>

        <Separator className="h-5" orientation="vertical" />

        <TooltipWrapper content={<p>Previous task</p>}>
          <Button variant="ghost" size="icon_xs">
            <ChevronUpIcon className="size-5" />
          </Button>
        </TooltipWrapper>
        <TooltipWrapper content={<p>Next task</p>}>
          <Button variant="ghost" size="icon_xs">
            <ChevronDownIcon className="size-5" />
          </Button>
        </TooltipWrapper>
      </ButtonList>

      <EmptyState
        // title="No items selected"
        subtitle="Pick a task to display and modify its data."
      />
    </div>
  );
}
