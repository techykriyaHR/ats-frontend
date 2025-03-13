import React, { useState } from "react";
import { usePositions } from "../hooks/usePositions";
import { useStages } from "../hooks/useStages";
import { initialStages } from "../utils/StagesData";
import { filterCounter } from "../utils/statusCounterFunctions";

export default function StatusCounter() {
  const positions = usePositions();
  const { stages, setStages, toggleStage, toggleStatus } = useStages();
  //const [stages, setStages] = useState()

  return (
    <div className="w-full h-99/100 mx-auto rounded-3xl bg-white p-6 border border-gray-light">
      <div className="mb-4 flex items-center justify-between rounded-lg">
        <h2 className="headline text-gray-dark md:mb-0">Status Counter</h2>
        <select className="border border-gray-light max-w-[120px] p-1 rounded-md text-sm"
          onChange={(e) => {filterCounter(e.target.value, setStages, initialStages); console.log(e.target.value)}}
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
              className={`flex cursor-pointer items-center justify-between ${stage.selected ? "bg-teal text-white" : "bg-gray-light text-gray-dark"
                } px-2 rounded-md hover:bg-teal-soft mb-2`}
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

            {/* Status Buttons */}
            <div className="overflow-hidden">
              <div className="space-y-2">
                {stage.statuses.map((status) => (
                  <div
                    onClick={() => toggleStatus(stage.name, status.name)}
                    key={status.name}
                    className={`flex justify-between items-center rounded-lg px-3 py-1 mx-1 border ${status.selected ? "border-teal-soft bg-teal-soft" : "border-gray-light"
                      } hover:bg-gray-light`}
                  >
                    <span className="body-regular text-gray-dark">{status.name}</span>
                    <span className="headline">{status.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
