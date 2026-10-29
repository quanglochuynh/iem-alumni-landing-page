import QRCode from 'qrcode';

export const generateQrCode = async (text: string): Promise<string> => {
  return await QRCode.toDataURL(text, {
    errorCorrectionLevel: 'M',
    margin: 0,
    scale: 8,
  });
};
