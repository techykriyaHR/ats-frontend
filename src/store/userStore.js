import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  features: {},
  setUser: (user) => set({ user })
}));

export default useUserStore;