import { PropsWithChildren } from "react";

function ButtonList({ children }: PropsWithChildren) {
  return <div className="flex items-center gap-2">{children}</div>;
}

export { ButtonList };
