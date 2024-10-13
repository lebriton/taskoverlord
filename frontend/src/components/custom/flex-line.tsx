import { cn } from "@/lib/utils";
import * as React from "react";

interface FlexLineProps {
  className?: string;
  start?: React.ReactNode;
  center?: React.ReactNode;
  end?: React.ReactNode;
  even?: boolean;
}

export default function FlexLine({ className, start, center, end, even = false }: FlexLineProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {start && <div className={cn("flex justify-start", even && "flex-1")}>{start}</div>}
      {center && <div>{center}</div>}
      {end && <div className={cn("flex justify-end", even && "flex-1")}>{end}</div>}
    </div>
  );
}

export { FlexLine };
