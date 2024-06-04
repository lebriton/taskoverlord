import classNames from "classnames";

export default function Heading2({ className, title, subtitle = "" }) {
  return (
    <h3 className={classNames("mb-6 text-2xl font-semibold", className)}>
      {title}
      {subtitle && <span className="ms-2 text-gray-500">{subtitle}</span>}
    </h3>
  );
}
