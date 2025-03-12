import api from "../api/axios";

export const getPositions = async () => {
  try {
    const response = await api.get(`/company/positions`);
    return response.data.positions;
  } catch (error) {
    console.error("Error fetching positions:", error);
    return [];
  }
};
