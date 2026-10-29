import { getR2ImageUrl } from '@/lib/cloudflare.helper';
import type { TFileRecord } from '@/schemas/file.schema';

export async function handleDownloadFile(
  media: TFileRecord,
  onError?: (e: Error) => void,
) {
  try {
    const response = await fetch(getR2ImageUrl(media.path));
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = media.name;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Download error:', error);
    if (onError) {
      onError(error as Error);
    }
  }
}
