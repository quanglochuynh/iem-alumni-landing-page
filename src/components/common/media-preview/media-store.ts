import { TFileRecord } from '@common/schema/file.schema';
import { create } from 'zustand';

type MediaItem = {
  title: string;
  description: string;
  dto: TFileRecord;
};

type MediaStore = {
  current: MediaItem | null;
  setCurrent: (media: MediaItem | null) => void;
};

export const useMediaStore = create<MediaStore>((set) => ({
  current: null,
  setCurrent: (media: MediaItem | null) => set({ current: media }),
}));
