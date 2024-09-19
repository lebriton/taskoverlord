import { TypographyH3, TypographyMuted } from "./typography";
import { cn } from "@/lib/utils";
import * as React from "react";

interface EmptyStateProps {
  className?: string;
  title?: string;
  subtitle?: string;
  extra?: React.ReactElement | null;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, title, subtitle, extra = null }, ref) => {
    return (
      <div
        className={cn(
          "flex size-full flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm",
          className,
        )}
        ref={ref}
      >
        <div className="flex flex-col items-center gap-1 text-center">
          {title && <TypographyH3>{title}</TypographyH3>}
          {subtitle && <TypographyMuted>{subtitle}</TypographyMuted>}

          {extra}
        </div>
      </div>
    );
  },
);

export { EmptyState };
