import { create } from 'zustand';

type PopupState = {
  content: React.ReactNode | null;
  setPopup: (content: React.ReactNode | null) => void;
};

export const popUpStore = create<PopupState>((set) => ({
  content: null,
  setPopup: (content) => set({ content }),
}));
