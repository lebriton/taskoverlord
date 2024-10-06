import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/utils/tooltip-utils";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

const buttonListVariants = cva("flex items-center", {
  variants: {
    size: {
      default: "gap-2",
      sm: "gap-1.5",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface Action {
  // TODO: fix the type (LucideIcon?)
  Icon: any;
  tooltip: string;
  onClick: (event: any) => void; // TODO: event type
}

interface ActionButtonProps {
  actions: Action[];
}

interface ButtonListProps extends VariantProps<typeof buttonListVariants> {
  className?: string;
}

function ActionButtons({ actions }: ActionButtonProps) {
  return (
    <ButtonList size="sm">
      {actions.map((action, index) => (
        <TooltipWrapper key={index} content={<p>{action.tooltip}</p>}>
          <Button variant="ghost" size="icon" onClick={action.onClick}>
            <action.Icon className="text-muted-foreground" />
          </Button>
        </TooltipWrapper>
      ))}
    </ButtonList>
  );
}

function ButtonList({ className, size, children }: PropsWithChildren<ButtonListProps>) {
  return <div className={cn(buttonListVariants({ size, className }))}>{children}</div>;
}

export { type Action, ActionButtons, ButtonList };
