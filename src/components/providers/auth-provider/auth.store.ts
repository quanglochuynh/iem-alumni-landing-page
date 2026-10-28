import { MeResponse } from '@common/types/user.types';
import { create } from 'zustand';

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
