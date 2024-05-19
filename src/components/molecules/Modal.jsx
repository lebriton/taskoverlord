import classNames from "classnames";

export default function Modal({ className, show, children, onClose }) {
  return (
    <div
      className={classNames(
        !show && "pointer-events-none opacity-0",
        "fixed left-0 right-0 top-0 z-50 flex h-full max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 backdrop-blur-sm transition-all duration-300 md:inset-0",
      )}
      onClick={onClose}
    >
      <div
        className={classNames(
          "relative max-h-full w-full max-w-7xl transition-all duration-300 py-12",
          !show && "translate-y-10",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
