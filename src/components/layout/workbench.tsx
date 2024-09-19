import { PropsWithChildren } from "react";

export default function Workbench({ children }: PropsWithChildren) {
  return <div className="size-full bg-muted/40">{children}</div>;
}
