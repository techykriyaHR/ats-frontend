import api from "../api/axios";
import { useApplicantData } from "../hooks/useApplicantData";

export const fetchApplicants = async (setApplicantData) => {
    const { data } = await api.get(`/applicants`);
    setApplicantData(data);
}

export const filterApplicants = async (position, setApplicantData, status) => {
    
    let sql = "/applicants/filter?";
    position != "All" ? sql += `position=${position}` : sql += "";
    // status != null ? sql += `&status=${status}` : sql += "";
    console.log(status);
    if (status.length === 0 && position === "All") {
        fetchApplicants(setApplicantData);
    }
    else {
        status.forEach((statusItem) => {
            sql += `&status=${statusItem}`;
          });
        const { data } = await api.get(sql);
        setApplicantData(data);
    }
}