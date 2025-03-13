import React from "react";
import { usePositions } from "../hooks/usePositions";
import { useStages } from "../hooks/useStages";
import { useCollapse } from "../hooks/useCollapse";
import { filterCounter } from "../utils/statusCounterFunctions";
import { initialStages } from "../utils/StagesData";

export default function StatusCounter() {
  const positions = usePositions();
  const { stages, setStages, toggleStage, toggleStatus } = useStages();
  const { collapsedStages, toggleCollapse } = useCollapse();

  // Check if at least one status is selected
  const hasSelectedStatus = stages.some((stage) =>
    stage.statuses.some((status) => status.selected),
  );

  // Function to clear all selections
  const clearSelections = () => {
    setStages((prevStages) =>
      prevStages.map((stage) => ({
        ...stage,
        selected: false,
        statuses: stage.statuses.map((status) => ({
          ...status,
          selected: false,
        })),
      })),
    );
  };

  return (
    <div className="border-gray-light mx-auto w-full rounded-3xl border bg-white p-6">
      <div className="mb-4 flex items-center justify-between rounded-lg">
        <h2 className="headline text-gray-dark md:mb-0">Status Counter</h2>
        <select
          className="border-gray-light max-w-[120px] rounded-md border p-1 text-sm"
          onChange={(e) =>
            filterCounter(e.target.value, setStages, initialStages)
          }
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
              onClick={() => toggleStage(stage.name)}
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
                {stage.statuses.map((status) => (
                  <div
                    onClick={() => toggleStatus(stage.name, status.name)}
                    key={status.name}
                    className={`mx-1 flex items-center justify-between rounded-lg border px-3 py-1 ${
                      status.selected
                        ? "border-teal-soft bg-teal-soft"
                        : "border-gray-light"
                    } hover:bg-gray-light`}
                  >
                    <span className="body-regular text-gray-dark">
                      {status.name}
                    </span>
                    <span className="headline">{status.count}</span>
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
