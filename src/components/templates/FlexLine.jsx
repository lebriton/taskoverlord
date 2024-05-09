import classNames from "classnames";

export default function FlexLine({ className, left, middle, right }) {
  return (
    <div className={classNames("flex items-center justify-between", className)}>
      <div className="ms-auto flex-1 text-start">{left}</div>
      <div>{middle}</div>
      <div className="me-auto flex-1 text-end">{right}</div>
    </div>
  );
}
