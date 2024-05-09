import classNames from "classnames";

// TODO: find a better component name
export default function FlexLine({ className, left, right }) {
  return (
    <div
      className={classNames("flex items-baseline justify-between", className)}
    >
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}
