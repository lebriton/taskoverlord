import classNames from "classnames";

export default function Modal({ show, children, onClose }) {
  return (
    <div
      className={classNames(
        !show && "hidden",
        "fixed left-0 right-0 top-0 z-40 flex h-full max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 md:inset-0",
      )}
      onClick={onClose}
    >
      <div
        className="relative max-h-full w-full max-w-7xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
