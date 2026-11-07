'use client';

import {
  type IScannerError,
  type IScannerHandle,
  Scanner,
} from '@yudiel/react-qr-scanner';
import { useEffect, useRef, useState } from 'react';
import Modal from '@/components/common/modal';
import Button from '@/components/common/overridden/button';
import type { IDisclosureControls } from '@/hooks';
import { useCommonTranslation } from '@/hooks';
import { AppRoute } from '@/interfaces';

type Props = {
  disclosure: IDisclosureControls;
  onScan: (code: string) => void;
};

function getContactCode(value: string): string | null {
  try {
    const url = new URL(value);
    const path = url.pathname.split('/').filter(Boolean);

    if (
      url.origin !== window.location.origin ||
      path.at(-1) !== AppRoute.MY_CONTACT.slice(1)
    ) {
      return null;
    }

    return url.searchParams.get('code') || null;
  } catch {
    return null;
  }
}

function ScannerSession({ onScan }: { onScan: (code: string) => void }) {
  const t = useCommonTranslation();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scannedRef = useRef(false);
  const activeRef = useRef(false);
  const [retryCount, setRetryCount] = useState(0);
  const [invalidQr, setInvalidQr] = useState(false);
  const [cameraError, setCameraError] = useState<IScannerError | null>(null);

  useEffect(() => {
    activeRef.current = true;
    return () => {
      activeRef.current = false;
    };
  }, []);

  const handleError = (error: IScannerError) => {
    // The scanner can fail after attaching a stream but before registering it.
    const stream = videoRef.current?.srcObject;
    if (stream && 'getTracks' in stream) {
      for (const track of stream.getTracks()) {
        track.stop();
      }
    }
    if (activeRef.current) setCameraError(error);
  };

  let errorMessage: string | null = null;
  if (cameraError) {
    if (
      cameraError.kind === 'permission-denied' ||
      cameraError.kind === 'security'
    ) {
      errorMessage = t('Camera permission denied');
    } else if (cameraError.kind === 'no-camera') {
      errorMessage = t('No camera found');
    } else {
      errorMessage = t('Camera could not start');
    }
  } else if (invalidQr) {
    errorMessage = t('Invalid QR');
  }

  return (
    <div className="space-y-4">
      {!cameraError && (
        <Scanner
          key={retryCount}
          ref={(handle: IScannerHandle | null) => {
            if (handle) videoRef.current = handle.getVideoElement();
          }}
          formats={['qr_code']}
          constraints={{ facingMode: 'environment' }}
          classNames={{
            container: 'aspect-video overflow-hidden rounded-md bg-black',
            video: 'object-cover',
          }}
          components={{ finder: false }}
          allowMultiple
          scanDelay={500}
          sound={false}
          onError={handleError}
          onScan={(results) => {
            if (!activeRef.current || scannedRef.current) return;
            const code = results
              .map((result) => getContactCode(result.rawValue))
              .find((value) => value !== null);
            if (!code) {
              setInvalidQr(true);
              return;
            }
            scannedRef.current = true;
            onScan(code);
          }}
        />
      )}
      {errorMessage && (
        <div className="space-y-3 text-center" role="alert">
          <p className="text-destructive text-sm">{errorMessage}</p>
          {cameraError && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setCameraError(null);
                setInvalidQr(false);
                setRetryCount((count) => count + 1);
              }}
            >
              {t('Try again')}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default function ScanQrModal({ disclosure, onScan }: Props) {
  const t = useCommonTranslation();

  return (
    <Modal
      title={t('Scan QR')}
      description={t('Point your camera at a QR code')}
      open={disclosure.isOpen}
      onOpenChange={disclosure.updateOpen}
    >
      {disclosure.isOpen && <ScannerSession onScan={onScan} />}
    </Modal>
  );
}
