export default function IconLabel({ Icon, label }) {
  return (
    <div className="flex items-center gap-1 text-neutral-500">
      <Icon className="size-4 text-neutral-400" />
      {label}
    </div>
  );
}
