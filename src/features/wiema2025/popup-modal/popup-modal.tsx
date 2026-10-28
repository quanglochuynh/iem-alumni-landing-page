'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { popUpStore } from '@/features/wiema2025/popup-modal/popup.store';
import { useCommonTranslation } from '@/hooks';

export default function PopupModal() {
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
