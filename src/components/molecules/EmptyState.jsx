export default function EmptyState({ title, subtitle, icon }) {
  return (
    <div className="flex flex-col items-center px-4 py-12">
      {icon}
      <h3 className="mt-2 text-sm font-semibold">{title}</h3>
      <p className="mt-1 text-sm leading-5 text-neutral-500">{subtitle}</p>
    </div>
  );
}
