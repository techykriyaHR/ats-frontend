import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const stages = [
  {
    name: "Pre-Screening Stage",
    count: 999,
    statuses: [{ name: "Test Sent", count: 99 }],
  },
  {
    name: "Interview Schedule Stage",
    count: 999,
    statuses: [
      { name: "Interview Schedule Sent", count: 99 },
      { name: "First Interview Stage", count: 99 },
      { name: "Second Interview Stage", count: 99 },
      { name: "Third Interview Stage", count: 99 },
      { name: "Fourth Interview Status", count: 99 },
      { name: "Follow-Up Interview Stage", count: 99 },
    ],
  },
  {
    name: "Job Offer Stage",
    count: 999,
    statuses: [
      { name: "For Job Offer", count: 99 },
      { name: "Job Offer Rejected", count: 99 },
      { name: "Job Offer Accepted", count: 99 },
    ],
  },
  {
    name: "Unsuccessful Stage/Pool",
    count: 999,
    statuses: [
      { name: "Withdrew Application", count: 99 },
      { name: "Blacklisted/Short-banned", count: 99 },
      { name: "Not Fit", count: 99 },
    ],
  },
];

export default function StatusCounter() {
  const [expandedStages, setExpandedStages] = useState(
    stages.map((stage) => stage.name)
  );

  const toggleStage = (stageName) => {
    setExpandedStages((prev) =>
      prev.includes(stageName)
        ? prev.filter((name) => name !== stageName)
        : [...prev, stageName]
    );
  };

  return (
    <div className="w-full rounded-3xl bg-white p-4 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Status Counter</h2>
        <select className="w-[130px] p-2 border border-gray-300 rounded-md">
          <option value="all">All Positions</option>
          <option value="engineer">Engineer</option>
          <option value="designer">Designer</option>
          <option value="manager">Manager</option>
        </select>
      </div>

      <div className="space-y-4">
        {stages.map((stage) => (
          <div key={stage.name} className="rounded-lg">
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={() => toggleStage(stage.name)}
            >
              <div className="flex items-center justify-between flex-1">
                <span className="font-medium text-sm">{stage.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{stage.count}</span>
                  <button
                    className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add info tooltip functionality here
                    }}
                  >
                    <FaInfoCircle className="h-3 w-3 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`grid transition-all ${
                expandedStages.includes(stage.name)
                  ? "grid-rows-[1fr] mt-2"
                  : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-2">
                  {stage.statuses.map((status) => (
                    <div
                      key={status.name}
                      className="flex justify-between rounded-lg bg-gray-50 px-4 py-2.5"
                    >
                      <span className="text-sm text-gray-600">
                        {status.name}
                      </span>
                      <span className="text-sm font-medium">
                        {status.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
