import api from "../api/axios";
import moment from "moment";
import { useApplicantData } from "../hooks/useApplicantData";

export const fetchApplicants = async (setApplicantData) => {
    const { data } = await api.get(`/applicants`);
    setApplicantData(data);
}

export const filterApplicants = async (position, setApplicantData, status, date, dateType) => {
    
    let sql = "/applicants/filter?";
    position != "All" ? sql += `position=${position}` : sql += "";
    date !== "" ? sql += `&${dateType}=${date}` : sql += "";
    // status != null ? sql += `&status=${status}` : sql += "";
    if (status.length === 0 && position === "All" && date === "") {
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

export const searchApplicant = async (searchValue, setApplicantData, positionFilter, status, dateFilterType, dateFilter) => {
    let sql = "/applicants/search?";
    console.log(dateFilterType);
    if (searchValue === "") {
        //positionFilter === "All" ? fetchApplicants(setApplicantData) : filterApplicants(positionFilter, setApplicantData, []);   
        if (positionFilter === "All" && status == [] && dateFilter === "") {
            fetchApplicants(setApplicantData);
        }     
        else {
            dateFilterType === 'month' ?
            filterApplicants(positionFilter, setApplicantData, status, moment(dateFilter).format("MMMM"), dateFilterType) :
            //filterApplicants(positionFilter, setApplicantData, status, dateFilter, dateFilterType) :
            filterApplicants(positionFilter, setApplicantData, status, dateFilter, dateFilterType);
        }
    }
    else if (searchValue !== "") {
        sql += `searchQuery=${searchValue}`;
        positionFilter !== "All" ? sql += `&position=${positionFilter}` : sql += "";
        status.forEach((statusItem) => {
            sql += `&status=${statusItem}`;
        });
        if (dateFilter !== "") {
            if (dateFilterType === "month") {
                sql += `&month=${moment(dateFilter).format("MMMM")}`;
            }
            else if (dateFilterType === "year") {
                sql += `&year=${dateFilter}`;
            }
        }
        const { data } = await api.get(sql);
        console.log(data);
        setApplicantData(data); 
    }
}