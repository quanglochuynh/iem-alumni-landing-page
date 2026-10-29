import { useEffect, useState } from 'react';
import Modal from '@/components/common/modal';
import { Spinner } from '@/components/ui/spinner';
import type { IDisclosureControls } from '@/hooks';
import { generateQrCode } from '@/lib';

type Props = {
  disclosure: IDisclosureControls<{ href: string }>;
};

export default function QrModal({ disclosure }: Props) {
  const [qrData, setQrData] = useState<string | null>(null);

  useEffect(() => {
    const createQrCode = async () => {
      if (disclosure.data?.href) {
        setQrData(await generateQrCode(disclosure.data.href));
      }
    };

    void createQrCode();
  }, [disclosure.data?.href]);

  return (
    <Modal
      title="Your QR Code"
      description="Let others scan this QR code to share your information"
      open={disclosure.isOpen}
      onOpenChange={disclosure.updateOpen}
    >
      <div className="flex justify-center">
        {qrData ? (
          <img src={qrData} alt="Your QR Code" className="size-64" />
        ) : (
          <Spinner />
        )}
      </div>
    </Modal>
  );
}
