import api from "../api/axios";


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
export const filterCounter = async (position, setStages, initialStages) => {
  setStages(initialStages);
  const counts = await api.get(`/counter/?position=${position}`);
  
  setStages((prevStages) =>
    prevStages.map((stage) => ({
      ...stage,
      count: counts.data[stage.name],
      statuses: stage.statuses.map((status) => ({
        ...status,
        count: counts.data[status.name] || status.count,
      })),
    }))
  );
}