import classNames from "classnames";

export default function Modal({ show, children, onClose }) {
  return (
    <div
      className={classNames(
        !show && "opacity-0 pointer-events-none",
        "fixed left-0 right-0 top-0 z-40 flex h-full max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 md:inset-0 backdrop-blur-sm transition-all duration-300",
      )}
      onClick={onClose}
    >
      <div
        className=
        {classNames(
        "relative max-h-full w-full max-w-7xl transition-all duration-300",
        !show && "translate-y-10",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
