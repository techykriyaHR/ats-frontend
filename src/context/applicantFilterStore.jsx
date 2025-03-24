import { create } from 'zustand';

const applicantFilterStore = create((set) => ({
  status: [],
  search: "",
  dateFilter:  "",
  dateFilterType: "month",
  setDateFilterType: (payload) => set({ dateFilterType: payload }),
  setDateFilter: (payload) => set({ dateFilter: payload }),
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
