import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



const statuses = [
    "None",
    "Sent Test",
    "First Interview Stage",
    "Final Interview Stage",
    "Job Offer Sent",
    "Abandoned",
    "Blacklisted",
    "No Show",
    "Not Fit",
];



const ApplicantTable = () => {
    // State to track applicant data
    let [applicantData, setApplicantData] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/applicants`)
            .then(response => {
                console.log(response.data);
                setApplicantData(response.data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    // Function to handle status change
    const handleStatusChange = (id, newStatus) => {
        setApplicantData(prevData =>
            prevData.map(applicant =>
                applicant.applicant_id === id
                    ? { ...applicant, status: newStatus }
                    : applicant
            )
        );
    };

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
                    onChange={(e) => handleStatusChange(row.applicant_id, e.target.value)}
                    style={{ padding: '5px', borderRadius: '5px' }}
                >
                    {statuses.map(status => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            ),
            sortable: true,
        },
    ];

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
        />
    );
};

export default ApplicantTable;
