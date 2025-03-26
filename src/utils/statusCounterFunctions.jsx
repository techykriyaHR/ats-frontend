import api from "../api/axios";
import moment from "moment";
import { initialStages } from "./StagesData";
import { filterApplicants } from "./applicantDataUtils";
import { searchApplicant } from "./applicantDataUtils";

//Fetching all
export const fetchCounts = async (setStages, initialStages) => {
  const counts = await api.get(`/counter`);
  setStages(initialStages.map((stage) => ({
    ...stage,
    count: counts.data[stage.name],
    statuses: stage.statuses.map((status) => ({
      ...status,
      count: counts.data[status.name] || status.count,
    }))
  })))
};

//For filtering status counter
export const filterCounter = async (position, setStages, initialStages, setPositionFilter, selectedStatuses) => {
  setPositionFilter(position);
  setStages(initialStages);
  let counts = [{}]

  if (position != "All") {
    counts = await api.get(`/counter/?position=${position}`);
  }
  else{
    counts = await api.get(`/counter`);
  }

  setStages(initialStages.map((stage) => ({
    ...stage,
    count: counts.data[stage.name],
    statuses: stage.statuses.map((status) => ({
      ...status,
      count: counts.data[status.name] || status.count,
      selected: selectedStatuses.includes(status.value)
    }))
  })));
}

export const clearSelections = (stages, setStages, setSelectedStatuses, clearStatus, setStatus, setPositionFilter, search, dateFilterType, dateFilter, setApplicantData) => {
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
};