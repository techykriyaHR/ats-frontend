import { create } from 'zustand';

const applicantFilterStore = create((set) => ({
  status: [],
  search: "",
  setSearch: (payload) => set({ search: payload}),
  setStatus: (payload) => set((state) => {
    if (state.status.includes(payload)) {
      return { status: state.status.filter((status) => status !== payload) };
    } else {
      return { status: [...state.status, payload] };
    }
  }),
  clearStatus: () => set({ status: []})
}));

export default applicantFilterStore;
