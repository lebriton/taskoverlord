import classNames from "classnames";

export default function EmptyState({ className, title, subtitle, icon, Icon }) {
  return (
    <div
      className={classNames("flex flex-col items-center px-4 py-12", className)}
    >
      {icon}
      {Icon && <Icon className="size-10 text-neutral-400" />}
      <h3 className="mt-2 text-sm font-semibold">{title}</h3>
      <p className="mt-1 text-sm leading-5 text-neutral-500">{subtitle}</p>
    </div>
  );
}
