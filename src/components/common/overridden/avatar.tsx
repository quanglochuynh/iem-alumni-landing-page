import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn, getUserLastName } from '@/lib';

const avatarVariants = cva('', {
  variants: {
    size: {
      xs: 'size-5 text-[12px]',
      sm: 'size-6 text-xs',
      md: 'size-8 text-sm',
      lg: 'size-12',
      xl: 'size-16 text-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface Props extends VariantProps<typeof avatarVariants> {
  name?: string;
  src?: string | null;
  className?: string;
}

const DynamicAvatar = forwardRef<HTMLSpanElement, Props>(
  ({ name, src, className, size }, ref) => {
    const shortName = name ? getUserLastName(name)[0] : '?';
    return (
      <Avatar ref={ref} className={cn(avatarVariants({ size }), className)}>
        {src && (
          <AvatarImage
            src={src}
            className="object-cover"
            alt={name + ' avatar'}
          />
        )}
        <AvatarFallback className="bg-primary text-background">
          {shortName.toUpperCase()}
        </AvatarFallback>
      </Avatar>
    );
  },
);

DynamicAvatar.displayName = 'DynamicAvatar';

export default DynamicAvatar;
