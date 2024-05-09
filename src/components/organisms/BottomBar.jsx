function Button({ children }) {
  return (
    <button
      className="px-1.5 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-600"
      type="button"
    >
      {children}
    </button>
  );
}

export default function BottomBar() {
  return (
    <div className="flex h-6 w-full gap-1.5 border-t bg-neutral-50 px-1.5 text-xs leading-6">
      <Button>main*</Button>
      <Button>rust-analyzer</Button>
      <Button>-- INSERT --</Button>
    </div>
  );
}
