import type { VariantProps } from 'class-variance-authority';
import type { LucideIcon, LucideProps } from 'lucide-react';
import {
  Button as ButtonPrimitive,
  type buttonVariants,
} from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

type Props = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    icon?: LucideIcon;
    description?: string;
    iconProps?: LucideProps;
    visible?: boolean;
    params?: Record<string, unknown>;
  };

export default function Button({
  children,
  loading,
  icon: Icon,
  iconProps,
  disabled,
  visible = true,
  params,
  ...props
}: Props) {
  if (!visible) {
    return null;
  }
  const button = (
    <ButtonPrimitive disabled={disabled || loading} {...props}>
      {loading ? (
        <Spinner className="size-5" />
      ) : (
        Icon && <Icon className="size-5" {...iconProps} />
      )}
      {children}
    </ButtonPrimitive>
  );

  return button;
}
