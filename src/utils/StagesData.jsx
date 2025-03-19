export const initialStages = [
  {
    name: "Pre-Screening Stage",
    count: 0,
    statuses: [{ name: "Test Sent", count: 0, selected: false, value: "TEST_SENT" }],
    selected: false,
  },
  {
    name: "Interview Schedule Stage",
    count: 0,
    statuses: [
      { name: "Interview Schedule Sent", count: 0, selected: false, value: "INTERVIEW_SCHEDULE_SENT" },
      { name: "First Interview Stage", count: 0, selected: false, value: "FIRST_INTERVIEW" },
      { name: "Second Interview Stage", count: 0, selected: false, value: "SECOND_INTERVIEW" },
      { name: "Third Interview Stage", count: 0, selected: false, value: "THIRD_INTERVIEW" },
      { name: "Fourth Interview Stage", count: 0, selected: false, value: "FOURTH_INTERVIEW" },
      { name: "Follow-up Interview Stage", count: 0, selected: false, value: "FOLLOW_UP_INTERVIEW" },
    ],
    selected: false,
  },
  {
    name: "Job Offer Stage",
    count: 0,
    statuses: [
      { name: "For Job Offer", count: 0, selected: false, value: "FOR_JOB_OFFER" },
      { name: "Job Offer Rejected", count: 0, selected: false, value: "JOB_OFFER_REJECTED" },
      { name: "Job Offer Accepted", count: 0, selected: false, value: "JOB_OFFER_ACCEPTED" },
    ],
    selected: false,
  },
  {
    name: "Unsuccessful Stage/Pool",
    count: 0,
    statuses: [
      { name: "Withdrew Application", count: 0, selected: false, value: "WITHDREW_APPLICATION" },
      { name: "Blacklisted/Short-banned", count: 0, selected: false, value: "BLACKLISTED" },
      { name: "Not Fit", count: 0, selected: false, value: "NOT_FIT" },
    ],
    selected: false,
  },
];
