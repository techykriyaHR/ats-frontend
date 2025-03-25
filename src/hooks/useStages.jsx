// /src/hooks/useStages.js
import { useEffect, useState } from "react";
import { initialStages } from "../utils/StagesData";
import { fetchCounts, filterCounter } from "../utils/statusCounterFunctions";
import statusCounterStore from "../context/statusCounterStore";
import { filterApplicants } from "../utils/applicantDataUtils";
import moment from "moment";

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

export const handleStageClick = (stage, setSelectedStatuses, search, toggleStage, dateFilterType, dateFilter, positionFilter, setApplicantData, searchApplicant) => {
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
      //filterApplicants(positionFilter, setApplicantData, updatedStatuses, moment(dateFilter).format("MMMM"), dateFilterType);
      if (search === "") {
        dateFilterType === 'month' ?
        filterApplicants(positionFilter, setApplicantData, updatedStatuses, moment(dateFilter).format("MMMM"), dateFilterType) :
        filterApplicants(positionFilter, setApplicantData, updatedStatuses, moment(dateFilter).format("YYYY"), dateFilterType)
      }
      else {
        searchApplicant(search, setApplicantData, positionFilter, updatedStatuses, dateFilterType, dateFilter);
      }

      return updatedStatuses; // Return the updated state
    });

    // Toggle the stage's selected state
    toggleStage(stage.name);
  };
