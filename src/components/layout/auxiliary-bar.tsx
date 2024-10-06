import FlexLine from "../custom/flex-line";
import { ActionButtons, ButtonList } from "../utils/button-utils";
import { EmptyState } from "@/components/custom/empty-state";
import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/utils/tooltip-utils";
import { ChevronDownIcon, ChevronUpIcon, EllipsisIcon, XIcon } from "lucide-react";

export default function AuxiliaryBar() {
  return (
    <div className="flex size-full flex-col gap-1.5 bg-muted/40 px-3 py-1.5 text-muted-foreground">
      <FlexLine
        start={
          <ActionButtons
            actions={[
              {
                Icon: ChevronUpIcon,
                tooltip: "Previous task",
                onClick: () => null,
              },
              {
                Icon: ChevronDownIcon,
                tooltip: "Next task",
                onClick: () => null,
              },
            ]}
          />
        }
        end={
          <ActionButtons
            actions={[
              {
                Icon: EllipsisIcon,
                tooltip: "More actions…",
                onClick: () => null,
              },
              {
                Icon: XIcon,
                tooltip: "Close",
                onClick: () => null,
              },
            ]}
          />
        }
      />

      <EmptyState title="No items selected" subtitle="Pick a task to display and modify its data." />
    </div>
  );
}
