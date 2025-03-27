import { create } from 'zustand';

const applicantDataStore = create((set) => ({
  applicantData: [],
  statuses: [],
  setApplicantData: (payload) => set({ applicantData: payload }),
  setStatuses: (payload) => set({ statuses: payload }),
  updateApplicantStatus: (id, status) =>
    set((state) => ({
      applicantData: state.applicantData.map((applicant) =>
        applicant.applicant_id === id
          ? { ...applicant, status: status }
          : applicant
      ),
    })),
}));

export default applicantDataStore;