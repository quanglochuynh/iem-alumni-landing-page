import type { ComponentProps } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

type Props = ComponentProps<'div'>;

export default function LoadingScreen({ className, ...props }: Props) {
  return (
    <div
      className={cn('flex h-screen items-center justify-center', className)}
      {...props}
    >
      <Spinner className="size-20" />
    </div>
  );
}
