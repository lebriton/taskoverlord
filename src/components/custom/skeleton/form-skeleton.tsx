import { Skeleton } from "@/components/ui/skeleton";
import { FormColumn } from "@/components/utils/form-utils";

interface SkeletonFormProps {
  numInputs: number;
}

export function SkeletonForm({ numInputs }: SkeletonFormProps) {
  return (
    <div className="flex flex-col gap-y-2.5">
      {Array.from({ length: numInputs }).map((_, index) => (
        <FormColumn key={index}>
          <Skeleton className="my-1 h-5 w-[150px]" /> {/* Label skeleton */}
          <Skeleton className="h-7 w-full rounded-md" /> {/* Input skeleton */}
        </FormColumn>
      ))}
    </div>
  );
}
