import React, { useState } from "react";
import { usePositions } from "../hooks/usePositions";
import { useStages, handleStageClick } from "../hooks/useStages";
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
import { fetchCounts } from "../utils/statusCounterFunctions";
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
    setStatus([]);
    setPositionFilter("All");

    fetchCounts(setStages, initialStages);

    if (search === "") {        
      dateFilterType === 'month' ?
      filterApplicants("All", setApplicantData, [], moment(dateFilter).format("MMMM"), dateFilterType) :
      filterApplicants("All", setApplicantData, [], moment(dateFilter).format("YYYY"), dateFilterType)
    }
    else {
      dateFilterType === 'month' ? 
      searchApplicant(search, setApplicantData, "All", [], dateFilterType, moment(dateFilter).format("MMMM")):
      searchApplicant(search, setApplicantData, "All", [],  dateFilterType, moment(dateFilter).format("YYYY"));
    }
    //fetchApplicants(setApplicantData);
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
            if (search === "") {        
              dateFilterType === 'month' ?
              filterApplicants(e.target.value, setApplicantData, status, moment(dateFilter).format("MMMM"), dateFilterType) :
              filterApplicants(e.target.value, setApplicantData, status, moment(dateFilter).format("YYYY"), dateFilterType)
            }
            else {
              searchApplicant(search, setApplicantData, e.target.value, status, dateFilterType, dateFilter);
            }
          }}
          value={positionFilter}
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
              onClick={() => handleStageClick(stage, setSelectedStatuses, search, toggleStage, dateFilterType, dateFilter, positionFilter, setApplicantData, searchApplicant)}
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
                            )
                          : [...prevStatuses, Status.value];
                          if (search === "") {        
                            dateFilterType === 'month' ?
                            filterApplicants(positionFilter, setApplicantData, updatedStatuses, moment(dateFilter).format("MMMM"), dateFilterType) :
                            filterApplicants(positionFilter, setApplicantData, updatedStatuses, moment(dateFilter).format("YYYY"), dateFilterType)
                          }
                          else {
                            searchApplicant(search, setApplicantData, positionFilter, updatedStatuses, dateFilterType, dateFilter);
                          }
                          return updatedStatuses;
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