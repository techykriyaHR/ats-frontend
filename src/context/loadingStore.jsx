import { create } from 'zustand';

const useLoadingStore = create((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}));

export default useLoadingStore;