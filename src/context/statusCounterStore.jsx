import { create } from 'zustand';
import { initialStages } from '../utils/StagesData';

const statusCounterStore = create((set) => ({
  stages: initialStages,
  setStages: (payload) => set({ stages: payload }),
}));

export default statusCounterStore;