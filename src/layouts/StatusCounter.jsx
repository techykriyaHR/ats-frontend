import React, { useState } from "react";
import { usePositions } from "../hooks/usePositions";
import { useStages } from "../hooks/useStages";
import { useCollapse } from "../hooks/useCollapse";
import { filterCounter } from "../utils/statusCounterFunctions";
import { initialStages } from "../utils/StagesData";
import { filterApplicants, fetchApplicants } from "../utils/applicantDataUtils";
import { useApplicantData } from "../hooks/useApplicantData";
import positionStore from "../context/positionStore";
import statusCounterStore from "../context/statusCounterStore";
import { set } from "date-fns";
import applicantFilterStore from "../context/applicantFilterStore";
import applicantDataStore from "../context/applicantDataStore";
import { searchApplicant } from "../utils/applicantDataUtils";
import moment from "moment";

export default function StatusCounter() {
  const positions = usePositions();
  const { stages, setStages, toggleStage, toggleStatus } = useStages();
  const { collapsedStages, toggleCollapse } = useCollapse();
  const { positionFilter, setPositionFilter } = positionStore();
  const { status, setStatus, clearStatus, search, dateFilter, dateFilterType } = applicantFilterStore();
  const { setApplicantData } = applicantDataStore();
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  // Check if at least one status is selected
  const hasSelectedStatus = stages.some((stage) =>
    stage.statuses.some((status) => status.selected),
  );

  // Function to handle stage click
  const handleStageClick = (stage) => {
    const stageStatuses = stage.statuses.map((status) => status.value);

    setSelectedStatuses((prevStatuses) => {
      // Check if all statuses in the stage are already selected
      const allSelected = stageStatuses.every((status) =>
        prevStatuses.includes(status),
      );

      let updatedStatuses;
      if (allSelected) {
        // If all statuses are selected, remove them
        updatedStatuses = prevStatuses.filter(
          (status) => !stageStatuses.includes(status),
        );
      } else {
        // Otherwise, add the statuses that are not already selected
        updatedStatuses = [
          ...prevStatuses,
          ...stageStatuses.filter((status) => !prevStatuses.includes(status)),
        ];
      }

      // Call filterApplicants with the updated statuses
      filterApplicants(positionFilter, setApplicantData, updatedStatuses, moment(dateFilter).format("MMMM"), dateFilterType);

      return updatedStatuses; // Return the updated state
    });

    // Toggle the stage's selected state
    toggleStage(stage.name);
  };

  // Function to clear all selections
  const clearSelections = () => {
    setStages(
      stages.map((stage) => ({
        ...stage,
        selected: false,
        statuses: stage.statuses.map((status) => ({
          ...status,
          selected: false,
        })),
      })),
    );
    setSelectedStatuses([]);
    clearStatus([]);
    fetchApplicants(setApplicantData);
  };

  return (
    <div className="border-gray-light mx-auto w-full rounded-3xl border bg-white p-6">
      <div className="mb-4 flex items-center justify-between rounded-lg">
        <h2 className="headline text-gray-dark md:mb-0">Status Counter</h2>
        <select
          className="border-gray-light max-w-[120px] rounded-md border p-1 text-sm"
          onChange={(e) => {
            filterCounter(
              e.target.value,
              setStages,
              initialStages,
              setPositionFilter,
              selectedStatuses,
            );
            search === "" ? 
            filterApplicants(e.target.value, setApplicantData, status, moment(dateFilter).format("MMMM"), dateFilterType) :
            searchApplicant(search, setApplicantData, e.target.value, status, dateFilterType, dateFilter);
          }}
        >
          <option value="All">All Positions</option>
          {positions.map((position) => (
            <option key={position.job_id} value={position.title}>
              {position.title}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        {stages.map((stage) => (
          <div key={stage.name}>
            {/* Stage Button */}
            <div
              className={`flex cursor-pointer items-center justify-between ${
                stage.selected
                  ? "bg-teal text-white"
                  : "bg-gray-light text-gray-dark"
              } hover:bg-teal-soft mb-2 rounded-md px-2`}
              onClick={() => handleStageClick(stage)}
            >
              <div className="flex flex-1 items-center justify-between">
                <span className="body-bold">{stage.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{stage.count}</span>
                  <span
                    className="hover:text-gray-light text-red-soft"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents parent click event
                      toggleCollapse(stage.name);
                    }}
                  >
                    {collapsedStages[stage.name] ? "▼" : "▲"}
                  </span>
                </div>
              </div>
            </div>

            {/* Status Buttons - Collapsible */}
            {!collapsedStages[stage.name] && (
              <div className="space-y-2 overflow-hidden">
                {stage.statuses.map((Status) => (
                  <div
                    onClick={() => {
                      toggleStatus(
                        stage.name,
                        Status.name,
                        Status.value,
                        positionFilter,
                        setApplicantData,
                      );
                      setSelectedStatuses((prevStatuses) => {
                        const updatedStatuses = prevStatuses.includes(
                          Status.value,
                        )
                          ? prevStatuses.filter(
                              (status) => status !== Status.value,
                            ) // Remove if already present
                          : [...prevStatuses, Status.value]; // Add if not present
                          search === "" ?
                          filterApplicants(
                            positionFilter,
                            setApplicantData,
                            updatedStatuses,
                            moment(dateFilter).format("MMMM"),
                            dateFilterType,
                          ) : 
                          searchApplicant(search, setApplicantData, positionFilter, updatedStatuses, dateFilterType, dateFilter);
                          return updatedStatuses; // Return the updated state
                      });
                      setStatus(Status.value);
                    }}
                    key={Status.name}
                    className={`mx-1 flex items-center justify-between rounded-lg border px-3 py-1 ${
                      Status.selected
                        ? "border-teal-soft bg-teal-soft"
                        : "border-gray-light"
                    } hover:bg-gray-light`}
                  >
                    <span className="body-regular text-gray-dark">
                      {Status.name}
                    </span>
                    <span className="headline">{Status.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Show Clear Button if any status is selected */}
      {hasSelectedStatus && (
        <div className="mt-4 text-end">
          <button
            onClick={clearSelections}
            className="text-gray-dark border-gray-light hover:bg-gray-light cursor-pointer rounded-lg border p-2 text-sm transition"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}