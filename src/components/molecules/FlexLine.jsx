import classNames from "classnames";

export default function FlexLine({ className, left, center, right }) {
  return (
    <div className={classNames("flex items-center justify-between", className)}>
      {left && <div className="ms-auto flex-1 text-start">{left}</div>}
      {center && <div>{center}</div>}
      {right && <div className="me-auto flex-1 text-end">{right}</div>}
    </div>
  );
}
