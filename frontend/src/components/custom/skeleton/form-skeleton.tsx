import { Skeleton } from "@/components/ui/skeleton";
import { FormColumn } from "@/components/utils/form-utils";

interface SkeletonFormProps {
  numInputs: number;
}

export function SkeletonForm({ numInputs }: SkeletonFormProps) {
  return (
    <FormColumn>
      {Array.from({ length: numInputs }).map((_, index) => (
        <div key={index}>
          <Skeleton className="my-1 h-5 w-[150px]" /> {/* Label skeleton */}
          <Skeleton className="h-7 w-full" /> {/* Input skeleton */}
        </div>
      ))}
    </FormColumn>
  );
}
