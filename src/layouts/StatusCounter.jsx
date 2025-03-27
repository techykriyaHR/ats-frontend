import React, { useState } from "react";
import { usePositions } from "../hooks/usePositions";
import { useStages, handleStageClick } from "../hooks/useStages";
import { useCollapse } from "../hooks/useCollapse";
import { filterCounter } from "../utils/statusCounterFunctions";
import { initialStages } from "../utils/StagesData";
import { filterApplicants } from "../utils/applicantDataUtils";
import positionStore from "../context/positionStore";
import applicantFilterStore from "../context/applicantFilterStore";
import applicantDataStore from "../context/applicantDataStore";
import { searchApplicant } from "../utils/applicantDataUtils";
import { clearSelections } from "../utils/statusCounterFunctions";
import { MdDeselect } from "react-icons/md";
import moment from "moment";

export default function StatusCounter() {
  const positions = usePositions();
  const { stages, setStages, toggleStage, toggleStatus } = useStages();
  const { collapsedStages, toggleCollapse } = useCollapse();
  const { positionFilter, setPositionFilter } = positionStore();
  const { status, setStatus, setStatusStage, clearStatus, search, dateFilter, dateFilterType } = applicantFilterStore();
  const { setApplicantData } = applicantDataStore();
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  // Check if at least one status is selected
  const hasSelectedStatus = stages.some((stage) =>
    stage.statuses.some((status) => status.selected),
  );


  return (
    <div className="border-gray-light mx-auto w-full rounded-3xl border bg-white p-6">
      <div className="mb-4 flex items-center justify-between rounded-lg">

        <h2 className="headline text-gray-dark md:mb-0">Status Counter</h2>

        <div className="items-center flex gap-2">
          {/* Show Clear Button if any status is selected */}
          {hasSelectedStatus && (
            <div
              className="text-end body-tiny text-gray-dark border border-gray-light hover:bg-gray-light rounded-md cursor-pointer p-0.5"
              data-tooltip-target="clear"
              onClick={() => clearSelections(stages, setStages, setSelectedStatuses, clearStatus, setStatus, setPositionFilter, search, dateFilterType, dateFilter, setApplicantData)}
            >
              <MdDeselect
                // onClick={() => clearSelections(stages, setStages, setSelectedStatuses, clearStatus, setStatus, setPositionFilter, search, dateFilterType, dateFilter, setApplicantData)}
                className="w-5 h-5 text-gray-dark hover:bg-gray-light rounded-2xl cursor-pointer"
              />
              {/* Clear */}
            </div>
          )}


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
              onClick={() => handleStageClick(stage, setSelectedStatuses, search, toggleStage, dateFilterType, dateFilter, positionFilter, setApplicantData, setStatusStage)}
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
                    className={`mx-1 flex items-center justify-between rounded-lg border px-3 py-1 ${Status.selected
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


    </div>
  );
}