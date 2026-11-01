import QRCode from 'qrcode';

export const generateQrCode = async (text: string): Promise<string> => {
  console.log('generate QR');

  return await QRCode.toDataURL(text, {
    errorCorrectionLevel: 'M',
    margin: 0,
    scale: 8,
  });
};
