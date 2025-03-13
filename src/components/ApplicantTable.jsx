import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import api from '../api/axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ApplicantTable = () => {
    // State for applicant data, pagination, and statuses
    const [applicantData, setApplicantData] = useState([]);
    const [totalApplicants, setTotalApplicants] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [statuses, setStatuses] = useState([]);

    // Fetch applicants with pagination
    useEffect(() => {
        fetchApplicants(currentPage, perPage);
    }, [currentPage, perPage]);

    const fetchApplicants = async (page, limit) => {
        try {
            const response = await api.get(`/applicants?page=${page}&limit=${limit}`);
            setApplicantData(response.data.applicants);
            setTotalApplicants(response.data.totalApplicants);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Fetch statuses
    useEffect(() => {
        api.get('/status')
            .then(response => {
                setStatuses(response.data);
            })
            .catch(error => console.error("Error fetching statuses:", error));
    }, []);

    // Function to handle status change
    const updateStatus = async (id, progress_id, status) => {
        const data = { progress_id, status };
        try {
            await axios.put(`${API_BASE_URL}/applicant/update/status`, data);
            setApplicantData(prevData =>
                prevData.map(applicant =>
                    applicant.applicant_id === id
                        ? { ...applicant, status }
                        : applicant
                )
            );
        } catch (error) {
            console.error("Update Status Failed:", error);
        }
    };

    // Define table columns
    const columns = [
        {
            name: 'Date Applied',
            selector: row => moment(row.date_created).format('MMMM DD, YYYY'),
            sortable: true,
        },
        {
            name: 'Applicant Name',
            selector: row => `${row.first_name} ${row.last_name}`,
        },
        {
            name: 'Position Applied',
            selector: row => row.title,
        },
        {
            name: 'Status',
            cell: row => (
                <select
                    className='border border-gray-light max-w-[100px]'
                    value={row.status}
                    onChange={(e) => updateStatus(row.applicant_id, row.progress_id, e.target.value)}
                    style={{ padding: '5px', borderRadius: '5px' }}
                >
                    {statuses.map(status => (
                        <option key={status} value={status}>
                            {status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                        </option>
                    ))}
                </select>
            ),
        },
    ];

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePerRowsChange = (newPerPage, page) => {
        setPerPage(newPerPage);
        setCurrentPage(page);
    };

    return (
        <DataTable
            pointerOnHover
            highlightOnHover
            fixedHeader
            striped
            fixedHeaderScrollHeight="60vh"
            responsive
            columns={columns}
            data={applicantData}
            onRowClicked={row => console.log(row.applicant_id)}
            pagination
            paginationServer
            paginationTotalRows={totalApplicants}
            paginationPerPage={perPage}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handlePerRowsChange}
        />
    );
};

export default ApplicantTable;
