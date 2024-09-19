import { cn } from "@/lib/utils";
import * as React from "react";

interface FlexLineProps {
  className?: string;
  start?: React.ReactNode;
  center?: React.ReactNode;
  end?: React.ReactNode;
}

export default function FlexLine({
  className,
  start,
  center,
  end,
}: FlexLineProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="ms-auto flex flex-1 justify-start">{start}</div>
      <div>{center}</div>
      <div className="me-auto flex flex-1 justify-end">{end}</div>
    </div>
  );
}

export { FlexLine };
