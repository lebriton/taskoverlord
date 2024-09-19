import { EmptyState } from "@/components/custom/empty-state";

export default function AuxiliaryBar() {
  return (
    <div className="size-full p-3">
      <EmptyState
        // title="No items selected"
        subtitle="Pick a task to display and modify its data."
      />
    </div>
  );
}
