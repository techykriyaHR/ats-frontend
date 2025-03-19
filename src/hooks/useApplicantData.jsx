import { useEffect, useState } from "react"
import api from "../api/axios";
import { usePositions } from "./usePositions";
import { fetchApplicants } from "../utils/applicantDataUtils";
import applicantDataStore from "../context/applicantDataStore";

export const useApplicantData = () => {
    // const [applicantData, setApplicantData] = useState([]);
    // const [statuses, setStatuses] = useState([]);

    const { applicantData, setApplicantData, statuses, setStatuses, updateApplicantStatus } = applicantDataStore();

    useEffect(() => {
        const getApplicants = async () => {
            await fetchApplicants(setApplicantData);
        }
        getApplicants();
    }, []);

    useEffect(() => {
        api.get(`/status`)
            .then(response => {
                console.log("Status Fetched Successfully.",);
                setStatuses(response.data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return { applicantData, setApplicantData, statuses, setStatuses, updateApplicantStatus }
}