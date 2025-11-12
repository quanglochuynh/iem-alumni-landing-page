'use client';

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { popUpStore } from '@/features/home/popup-modal/popup.store';
import { useCommonTranslation } from '@/hooks';
import { DialogTitle } from '@radix-ui/react-dialog';

type Props = {};

export default function PopupModal({}: Props) {
  const { content, setPopup } = popUpStore();
  const commonTrans = useCommonTranslation();
  return (
    <Dialog
      open={!!content}
      onOpenChange={(open) => {
        if (!open) setPopup(null);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{commonTrans('Notification')}</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
