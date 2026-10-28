import { create } from 'zustand';
import type { MeResponse } from '@/types/user.types';

type AuthStore = {
  userSession: MeResponse | null;
  setUserSession: (session: MeResponse) => void;
  logout: () => void;
};

export const authStore = create<AuthStore>((set) => ({
  userSession: null,
  setUserSession: (session) => set({ userSession: session }),
  logout: () => set({ userSession: null }),
}));
