import type { DialogContentProps, DialogProps } from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib';

export interface ModalProps extends DialogProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  trigger?: React.ReactNode;
  footer?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  contentProps?: DialogContentProps;
  overflow?: boolean;
  asChild?: boolean;
}

const Modal = ({
  children,
  title,
  description,
  footer,
  trigger,
  open,
  onOpenChange,
  contentProps,
  overflow = false,
  asChild = false,
  ...rest
}: ModalProps) => {
  const { className: contentClassName, ...restContentProps } =
    contentProps || {};
  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...rest}>
      {trigger && <DialogTrigger asChild={asChild}>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn(
          overflow && 'max-h-svh min-h-[80svh] overflow-y-auto p-2 md:p-6',
          contentClassName,
        )}
        {...restContentProps}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description || ''}</DialogDescription>
        </DialogHeader>
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
