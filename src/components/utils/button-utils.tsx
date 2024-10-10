import { isLucideIcon } from "./icon-utils";
import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/utils/tooltip-utils";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

const buttonListVariants = cva("flex items-center", {
  variants: {
    size: {
      default: "gap-2",
      sm: "gap-[4px]",
    },
    orientation: {
      horizontal: "",
      vertical: "flex-col items-stretch",
    },
  },
  defaultVariants: {
    size: "default",
    orientation: "horizontal",
  },
});

interface Action {
  // TODO: fix the type (LucideIcon?)
  Icon: any;
  tooltip: string;
  onClick: (event: any) => void; // TODO: event type
  className?: string;
}

interface ActionButtonProps {
  variant?: "ghost" | "plain";
  actions: Action[];
}

interface ButtonListProps extends VariantProps<typeof buttonListVariants> {
  className?: string;
}

function ActionButtons({ variant = "ghost", actions }: ActionButtonProps) {
  return (
    <ButtonList size={variant === "plain" ? "default" : "sm"}>
      {actions.map((action, index) => (
        <TooltipWrapper key={index} content={<p>{action.tooltip}</p>}>
          <Button
            className={cn(variant !== "plain" && "text-muted-foreground", action.className)}
            variant={variant}
            size={variant === "plain" ? "plain" : "icon"}
            onClick={action.onClick}
          >
            <action.Icon
              className={cn(
                variant === "plain" && !isLucideIcon(action.Icon) && "size-5",
                variant !== "plain" && "size-[22px]",
              )}
            />
          </Button>
        </TooltipWrapper>
      ))}
    </ButtonList>
  );
}

function ButtonList({ className, size, orientation, children }: PropsWithChildren<ButtonListProps>) {
  return <div className={cn(buttonListVariants({ size, orientation, className }))}>{children}</div>;
}

export { type Action, ActionButtons, ButtonList };
