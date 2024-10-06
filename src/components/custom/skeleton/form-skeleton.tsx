import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonFormProps {
  numInputs: number;
}

export function SkeletonForm({ numInputs }: SkeletonFormProps) {
  return (
    <div className="flex flex-col space-y-8">
      {Array.from({ length: numInputs }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-2">
          <Skeleton className="my-1 h-5 w-[150px]" /> {/* Label skeleton */}
          <Skeleton className="h-8 w-full rounded-md" /> {/* Input skeleton */}
        </div>
      ))}
    </div>
  );
}
