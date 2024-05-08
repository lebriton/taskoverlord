export default function IconLabel({ Icon, label }) {
  return (
    <div className="flex items-center gap-1">
      <Icon className="size-4" />
      {label}
    </div>
  );
}
