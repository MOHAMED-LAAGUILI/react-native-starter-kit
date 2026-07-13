import * as ProgressPrimitive from '@rn-primitives/progress';
import { cn } from '@/lib/utils';

type ProgressProps = {
  value: number;
  className?: string;
};

function Progress({ value, className }: ProgressProps) {
  return (
    <ProgressPrimitive.Root className={cn('bg-border h-2 overflow-hidden rounded-full', className)}>
      <ProgressPrimitive.Indicator
        className="bg-primary h-full rounded-full transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </ProgressPrimitive.Root>
  );
}

export type { ProgressProps };
export { Progress };
