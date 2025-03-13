import api from '../api/axios';

const getFilteredApplicants = async (dateFilter, dateFilterValue, position, status) => {
    const params = new URLSearchParams();

    if (dateFilter && dateFilterValue) {
        params.append(dateFilter, dateFilterValue);
    }
    
    if (position) {
        params.append("position", position);
    }

    if (status && Array.isArray(status)) {
        status.forEach(s => params.append("status", s));
    }

    const result = await api.get(`/applicants/filter?${params.toString()}`);
    console.log("result in get", result);
    
    return result.data;
};

export default getFilteredApplicants;
