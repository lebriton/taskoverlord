import classNames from "classnames";
import Heading2 from "../molecules/Heading2";

export default function EmptyState({ className, title, subtitle, Icon }) {
  return (
    <div
      className={classNames(
        "flex flex-col items-center justify-center px-4 py-12 text-center",
        className,
      )}
    >
      <div className="mb-4 rounded-full bg-purple-100 p-6">
        {Icon && <Icon className="size-10 text-neutral-700" />}
      </div>
      <Heading2 className="!mb-2" title={title} />
      <p className="text-sm leading-5 text-neutral-500">{subtitle}</p>
    </div>
  );
}
