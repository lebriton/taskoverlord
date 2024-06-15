import classNames from "classnames";

export default function FlexLine({ className, left, center, right }) {
  return (
    <div className={classNames("flex items-center justify-between", className)}>
      <div className="ms-auto flex-1">{left}</div>
      <div>{center}</div>
      <div className="me-auto flex flex-1 justify-end">{right}</div>
    </div>
  );
}
