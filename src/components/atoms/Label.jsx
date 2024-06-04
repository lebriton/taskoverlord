import classNames from "classnames";

export default function Label({ className, text, isOptional }) {
  return (
    <label
      className={classNames(
        "mb-2 block text-sm font-bold text-neutral-900",
        className,
      )}
    >
      {text}
      {isOptional && (
        <span className="font-normal text-neutral-700"> (optional)</span>
      )}
    </label>
  );
}
