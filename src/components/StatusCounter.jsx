import React, { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import axios from 'axios';
import api from "../api/axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    stages.map((stage) => stage.name),
  );

  const toggleStage = (stageName) => {
    setExpandedStages((prev) =>
      prev.includes(stageName)
        ? prev.filter((name) => name !== stageName)
        : [...prev, stageName],
    );
  };

  const [positions, setPositions] = useState([]);

  useEffect(() => {
    api.get(`/company/positions`)
      .then(response => {
        console.log(response.data.positions);
        setPositions(response.data.positions);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);


  return (
    <div className="w-full mx-auto rounded-3xl bg-white p-6 border border-gray-light">
      <div className="mb-4 flex items-center justify-between rounded-lg ">
        <h2 className="headline text-gray-dark font-semibold md:mb-0">Status Counter</h2>
        <select className="border border-gray-light max-w-[50px] sm:max-w-[120px] lg:max-w-[50px] xl:max-w-[120px] p-1 rounded-md text-sm">
          <option value="all">All Positions</option>
          {positions.map((position) => (
            <option key={position.job_id} value={position.job_id}>
              {position.title}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {stages.map((stage) => (
          <div key={stage.name} className="rounded-lg">
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={() => toggleStage(stage.name)}
            >
              <div className="flex flex-1 items-center justify-between">
                <span className="text-sm font-medium">{stage.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{stage.count}</span>
                  <button
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
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
              className={`grid transition-all ${expandedStages.includes(stage.name)
                ? "mt-2 grid-rows-[1fr]"
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
