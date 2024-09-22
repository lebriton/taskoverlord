import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

interface ButtonListProps extends VariantProps<typeof buttonListVariants> {
  className?: string;
}

const buttonListVariants = cva("flex items-center", {
  variants: {
    size: {
      default: "gap-2",
      sm: "gap-0.5",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

function ButtonList({
  className,
  size,
  children,
}: PropsWithChildren<ButtonListProps>) {
  return (
    <div className={cn(buttonListVariants({ size, className }))}>
      {children}
    </div>
  );
}

export { ButtonList };
