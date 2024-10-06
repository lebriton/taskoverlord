import { PropsWithChildren } from "react";

export default function Workbench({ children }: PropsWithChildren) {
  return (
    <div
      className="dark size-full bg-muted text-foreground"
      style={{
        "--muted": "205, 36.36%, 12.94%",
      }}
    >
      {children}
    </div>
  );
}
