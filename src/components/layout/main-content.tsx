import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PlusCircleIcon, SlidersHorizontalIcon } from "lucide-react";

interface FilterButtonProps {
  label: string;
}

function FilterButton({ label }: FilterButtonProps) {
  return (
    <Button variant="outline" className="border-dashed">
      <PlusCircleIcon className="mr-2 h-4 w-4" /> {label}
    </Button>
  );
}

function ConfigurationSection() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-x-2">
        <Input placeholder="Filter tasks…" className="w-[150px] lg:w-[250px]" />

        <FilterButton label="Status" />
        <FilterButton label="Priority" />
      </div>

      <Button variant="outline">
        <SlidersHorizontalIcon className="mr-2 size-4" /> View
      </Button>
    </div>
  );
}

export default function MainContent() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <ConfigurationSection />
      WIP - Main content
    </div>
  );
}
