import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import api from '../api/axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



const ApplicantTable = () => {

    // State to track applicant data
    let [applicantData, setApplicantData] = useState([]);

    useEffect(() => {
        api.get(`/applicants`)
            .then(response => {
                console.log("Applicant Fetched Successfully.");
                setApplicantData(response.data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    // All possible statuses
    let [statuses, setStatuses] = useState([]);

    useEffect(() => {
        console.log(API_BASE_URL);

        api.get(`/status`)
            .then(response => {
                console.log("Status Fetched Successfully.",);
                setStatuses(response.data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    // Function to handle status change
    const updateStatus = async (id, progress_id, status) => {
        let data = {
            "progress_id": progress_id,
            "status": status
        }
        try {
            await axios.put(`${API_BASE_URL}/applicant/update/status`, data);
            setApplicantData(prevData =>
                prevData.map(applicant =>
                    applicant.applicant_id === id
                        ? { ...applicant, status: status }
                        : applicant
                )
            );
        } catch (error) {
            console.error("Update Status Failed: " + error);
        }
    }

    // Function to handle row click
    const handleApplicantRowClick = (row) => {
        const applicant = applicantData.find((applicant) => applicant.applicant_id === row.applicant_id);
        if (applicant) {

            console.log(applicant.applicant_id);

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
                    ))
                    }
                </select >
            ),
        },
    ];

    const LoadingComponent = () => (
        <div className="flex flex-col space-y-2">
            <div className="w-full h-10 animate-pulse rounded-sm bg-gray-light"></div>
            <div className="w-full h-10 animate-pulse rounded-sm bg-gray-light"></div>
            <div className="w-full h-10 animate-pulse rounded-sm bg-gray-light"></div>
            <div className="w-full h-10 animate-pulse rounded-sm bg-gray-light"></div>
            <div className="w-full h-10 animate-pulse rounded-sm bg-gray-light"></div>
        </div>
    );

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
            component:striped={true}
            onRowClicked={handleApplicantRowClick}
            pagination
            progressPending={!applicantData.length || !statuses.length}
            // progressPending={true}
            progressComponent={<LoadingComponent />}
        />
    );
};

export default ApplicantTable;
