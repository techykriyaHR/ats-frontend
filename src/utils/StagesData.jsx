export const initialStages = [
  {
    name: "Pre-Screening Stage",
    count: 0,
    statuses: [{ name: "Test Sent", count: 0, selected: false }],
    selected: false,
  },
  {
    name: "Interview Schedule Stage",
    count: 0,
    statuses: [
      { name: "Interview Schedule Sent", count: 0, selected: false },
      { name: "First Interview Stage", count: 0, selected: false },
      { name: "Second Interview Stage", count: 0, selected: false },
      { name: "Third Interview Stage", count: 0, selected: false },
      { name: "Fourth Interview Status", count: 0, selected: false },
      { name: "Follow-Up Interview Stage", count: 0, selected: false },
    ],
    selected: false,
  },
  {
    name: "Job Offer Stage",
    count: 0,
    statuses: [
      { name: "For Job Offer", count: 0, selected: false },
      { name: "Job Offer Rejected", count: 0, selected: false },
      { name: "Job Offer Accepted", count: 0, selected: false },
    ],
    selected: false,
  },
  {
    name: "Unsuccessful Stage/Pool",
    count: 0,
    statuses: [
      { name: "Withdrew Application", count: 0, selected: false },
      { name: "Blacklisted/Short-banned", count: 0, selected: false },
      { name: "Not Fit", count: 0, selected: false },
    ],
    selected: false,
  },
];
