import { PropsWithChildren } from "react";

export default function Workbench({ children }: PropsWithChildren) {
  return <div className="dark size-full bg-background text-foreground">{children}</div>;
}
