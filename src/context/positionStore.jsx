import { create } from 'zustand';

const positionStore = create((set) => ({
  positionFilter: "All",
  setPositionFilter: (payload) => set({ positionFilter: payload }),
}));

export default positionStore;