// /src/hooks/useStages.js
import { useEffect, useState } from "react";
import { initialStages } from "../utils/StagesData";
import { fetchCounts, filterCounter } from "../utils/statusCounterFunctions";
import statusCounterStore from "../context/statusCounterStore";
import { filterApplicants } from "../utils/applicantDataUtils";

export const useStages = () => {
  //const [stages, setStages] = useState(initialStages);
  const { stages, setStages } = statusCounterStore();

  useEffect(() => {
    const fetchInitialCounts = async () => {
      await fetchCounts(setStages, initialStages);
    };
    console.log("Status Counts Fetched Successfully.");
    fetchInitialCounts();
  }, []);

  const toggleStage = (stageName) => {
    setStages(
      stages.map((stage) =>
        stage.name === stageName
          ? {
              ...stage,
              selected: !stage.selected,
              statuses: stage.statuses.map((status) => ({
                ...status,
                selected: !stage.selected,
              })),
            }
          : stage,
      ),
    );
  };

  const toggleStatus = async (stageName, statusName, statusValue, positionFilter, setApplicantData) => {
    setStages((stages.map((stage) => {
      if (stage.name === stageName) {
        return {
          ...stage,
          statuses: stage.statuses.map((status) => {
            if (status.name === statusName) {
              return { ...status, selected: !status.selected };
            }
            return status;
          }),
          selected: stage.statuses.every((status) => {
            if (status.name === statusName) {
              return !status.selected;
            }
            return status.selected;
          }),
        };
      }
      return stage;
    }
    )));
  };
  

  return { stages, setStages, toggleStage, toggleStatus };
};
