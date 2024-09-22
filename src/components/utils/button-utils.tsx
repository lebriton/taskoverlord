import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

const buttonListVariants = cva("flex items-center", {
  variants: {
    size: {
      default: "gap-2",
      sm: "gap-1",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface ButtonListProps extends VariantProps<typeof buttonListVariants> {
  className?: string;
}

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
