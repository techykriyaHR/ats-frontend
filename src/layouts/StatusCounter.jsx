import React, { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import axios from 'axios';
import api from "../api/axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function StatusCounter() {

  const [positions, setPositions] = useState([]);

  useEffect(() => {
    api.get(`/company/positions`)
      .then(response => {
        console.log(response.data.positions);
        setPositions(response.data.positions);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);


  const [stages, setStages] = useState([
    {
      name: "Pre-Screening Stage",
      count: 0,
      statuses: [{ name: "Test Sent", count: 0, selected: false, }],
      selected: false,
    },
    {
      name: "Interview Schedule Stage",
      count: 0,
      statuses: [
        { name: "Interview Schedule Sent", count: 0, selected: false, },
        { name: "First Interview Stage", count: 0, selected: false, },
        { name: "Second Interview Stage", count: 0, selected: false, },
        { name: "Third Interview Stage", count: 0, selected: false, },
        { name: "Fourth Interview Status", count: 0, selected: false, },
        { name: "Follow-Up Interview Stage", count: 0, selected: false, },
      ],
      selected: false,
    },
    {
      name: "Job Offer Stage",
      count: 0,
      statuses: [
        { name: "For Job Offer", count: 0, selected: false, },
        { name: "Job Offer Rejected", count: 0, selected: false, },
        { name: "Job Offer Accepted", count: 0, selected: false, },
      ],
      selected: false,
    },
    {
      name: "Unsuccessful Stage/Pool",
      count: 0,
      statuses: [
        { name: "Withdrew Application", count: 0, selected: false, },
        { name: "Blacklisted/Short-banned", count: 0, selected: false, },
        { name: "Not Fit", count: 0, selected: false, },
      ],
      selected: false,
    },
  ]);

  const toggleStage = (stageName) => {
    const updatedStages = stages.map(stage => {
      if (stage.name === stageName) {
        const newSelected = !stage.selected;
        return {
          ...stage,
          selected: newSelected,
          statuses: stage.statuses.map(status => ({
            ...status,
            selected: newSelected
          }))
        };
      }
      return stage;
    });
    setStages(updatedStages);
  };

  const toggleStatus = (stageName, statusName) => {
    const updatedStages = stages.map(stage => {
      if (stage.name === stageName) {
        const updatedStatuses = stage.statuses.map(status => {
          if (status.name === statusName) {
            return {
              ...status,
              selected: !status.selected
            };
          }
          return status;
        });

        const allSelected = updatedStatuses.every(status => status.selected);
        return {
          ...stage,
          selected: allSelected,
          statuses: updatedStatuses
        };
      }
      return stage;
    });
    setStages(updatedStages);
  };


  return (
    <div className="w-full h-99/100 mx-auto rounded-3xl bg-white p-6 border border-gray-light">

      <div className="mb-4 flex items-center justify-between rounded-lg ">
        <h2 className="headline text-gray-dark md:mb-0">Status Counter</h2>
        <select className="border border-gray-light max-w-[50px] sm:max-w-[120px] lg:max-w-[50px] xl:max-w-[120px] p-1 rounded-md text-sm">
          <option value="all">All Positions</option>
          {positions.map((position) => (
            <option key={position.job_id} value={position.job_id}>
              {position.title}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        {stages.map((stage) => (
          <div key={stage.name}>

            {/* stages button */}
            <div
              className={`flex cursor-pointer items-center justify-between ${stage.selected ? "bg-teal text-white" : "bg-gray-light text-gray-dark"} px-2 rounded-md hover:bg-teal-soft mb-2`}
              onClick={() => toggleStage(stage.name)}
            >
              <div className="flex flex-1 items-center justify-between">
                <span className="body-bold">{stage.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{stage.count}</span>
                  <div className="rounded-lg bg-teal-soft w-3 h-3 border-2 border-background"></div>
                </div>
              </div>
            </div>

            {/* status buttons */}
            <div className="overflow-hidden">
              <div className="space-y-2">
                {stage.statuses.map((status) => (
                  <div
                    onClick={() => toggleStatus(stage.name, status.name)}
                    key={status.name}
                    className={`flex justify-between items-center rounded-lg px-3 py-1 mx-1 border ${status.selected ? "border-teal-soft bg-teal-soft" : " border-gray-light"} hover:bg-gray-light`}
                  >
                    <span className="body-regular text-gray-dark"> {status.name} </span>
                    <span className="headline"> {status.count} </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div >
  );
}
