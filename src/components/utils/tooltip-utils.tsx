import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PropsWithChildren } from "react";

interface TooltipWrapperProps {
  content: React.ReactNode;
  delayDuration?: number;
  side?: "right" | "top" | "bottom" | "left"; // TODO: import the correct type (enum?)
  align?: "center" | "end" | "start"; // TODO: use the correct type (enum?)
  asChild?: boolean;
}

function TooltipWrapper({
  content,
  delayDuration = 0.5,
  side = "top",
  align = "center",
  asChild = true,
  children,
}: PropsWithChildren<TooltipWrapperProps>) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { TooltipWrapper };
