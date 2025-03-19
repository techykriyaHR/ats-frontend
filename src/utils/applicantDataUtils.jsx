import api from "../api/axios";
import { useApplicantData } from "../hooks/useApplicantData";

export const fetchApplicants = async (setApplicantData) => {
    // api.get(`/applicants`).then( response => {
    //     setApplicantData(response.data)
    // }).catch(error => console.error("Error fetching data:", error));
    const { data } = await api.get(`/applicants`);
    setApplicantData(data);
}

export const filterApplicants = async (position, setApplicantData, status) => {
    
    let sql = "/applicants/filter?";
    position != "All" ? sql += `position=${position}` : sql += "";
    // status != null ? sql += `&status=${status}` : sql += "";
    if (status == []) {
        fetchApplicants(setApplicantData);
        return;
    }
    else if (status != []) {
        status.map((status) => {
            sql += `&status=${status}`;
        });
        const { data } = await api.get(sql);
        setApplicantData(data);
    }
}