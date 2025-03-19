import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import moment from 'moment';
import api from '../api/axios';
import Toast from '../assets/Toast';

const statusMapping = {
    "NONE": "",
    "TEST_SENT": "Test Sent",
    "INTERVIEW_SCHEDULE_SENT": "Interview Schedule Sent",
    "FIRST_INTERVIEW": "First Interview",
    "SECOND_INTERVIEW": "Second Interview",
    "THIRD_INTERVIEW": "Third Interview",
    "FOURTH_INTERVIEW": "Fourth Interview",
    "FOLLOW_UP_INTERVIEW": "Follow Up Interview",
    "FOR_JOB_OFFER": "Job Offer Accepted",
    "JOB_OFFER_REJECTED": "Job Offer Rejected",
    "JOB_OFFER_ACCEPTED": "Job Offer Accepted",
    "WITHDREW_APPLICATION": "Withdrew Application",
    "BLACKLISTED": "Blacklisted",
    "NOT_FIT": "Not Fit",
};

const ApplicantTable = ({ onSelectApplicant }) => {
    const [applicantData, setApplicantData] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [toasts, setToasts] = useState([]);

    // Add a ref to track and manage toast timeouts
    const [toastTimeouts, setToastTimeouts] = useState({});

    useEffect(() => {
        api.get(`/applicants`)
            .then(response => {
                console.log("Applicant Fetched Successfully.");
                setApplicantData(response.data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        api.get(`/status`)
            .then(response => {
                console.log("Status Fetched Successfully.");
                setStatuses(response.data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    // Clean up timeouts when component unmounts
    useEffect(() => {
        return () => {
            // Clear all timeouts on unmount
            Object.values(toastTimeouts).forEach(timeoutId => clearTimeout(timeoutId));
        };
    }, [toastTimeouts]);

    const updateStatus = async (id, progress_id, status) => {
        let data = {
            "progress_id": progress_id,
            "status": status
        };
        try {
            await api.put(`/applicant/update/status`, data);
            setApplicantData(prevData =>
                prevData.map(applicant =>
                    applicant.applicant_id === id
                        ? { ...applicant, status: status }
                        : applicant
                )
            );
            const applicant = applicantData.find(applicant => applicant.applicant_id === id);
            addToast(applicant, status);
        } catch (error) {
            console.error("Update Status Failed: " + error);
        }
    };

    const addToast = (applicant, status) => {
        const toastId = Date.now();
        const newToast = {
            id: toastId,
            applicant,
            status: statusMapping[status] || status,
            previousStatus: statusMapping[applicant.status] || applicant.status
        };

        setToasts(prevToasts => [...prevToasts, newToast]);

        // Store the timeout ID so we can clear it if needed
        const timeoutId = setTimeout(() => removeToast(toastId), 10000);
        setToastTimeouts(prev => ({ ...prev, [toastId]: timeoutId }));
    };

    const removeToast = (id) => {
        // Clear the timeout for this toast
        if (toastTimeouts[id]) {
            clearTimeout(toastTimeouts[id]);

            // Remove this timeout from the state
            setToastTimeouts(prev => {
                const updated = { ...prev };
                delete updated[id];
                return updated;
            });
        }

        // Remove the toast from state
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    };

    const undoStatusUpdate = async (toast) => {
        const { applicant, previousStatus } = toast;

        try {
            // Create the data object for the API call
            let data = {
                "progress_id": applicant.progress_id,
                "status": Object.keys(statusMapping).find(key => statusMapping[key] === previousStatus)
            };

            // Make the API call directly
            await api.put(`/applicant/update/status`, data);

            // Update the state without creating a new toast
            setApplicantData(prevData =>
                prevData.map(app =>
                    app.applicant_id === applicant.applicant_id
                        ? { ...app, status: Object.keys(statusMapping).find(key => statusMapping[key] === previousStatus) }
                        : app
                )
            );

            // Remove the current toast
            removeToast(toast.id);
        } catch (error) {
            console.error("Undo status update failed:", error);
        }
    };

    const handleStatusChange = (id, progress_id, newStatus) => {
        updateStatus(id, progress_id, newStatus);
    };

    const handleApplicantRowClick = (row) => {
        const applicant = applicantData.find((applicant) => applicant.applicant_id === row.applicant_id);
        if (applicant) {
            onSelectApplicant(applicant);
        }
    };

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
                    onChange={(e) => handleStatusChange(row.applicant_id, row.progress_id, e.target.value)}
                    style={{ padding: '5px', borderRadius: '5px' }}
                >
                    {statuses.map(status => (
                        <option key={status} value={status}>
                            {statusMapping[status] || status}
                        </option>
                    ))}
                </select>
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
        <>
            <DataTable
                pointerOnHover
                highlightOnHover
                fixedHeader
                striped
                fixedHeaderScrollHeight="60vh"
                responsive
                columns={columns}
                data={applicantData}
                onRowClicked={handleApplicantRowClick}
                pagination
                progressPending={!applicantData.length || !statuses.length}
                progressComponent={<LoadingComponent />}
            />
            <div className="fixed top-4 right-4 space-y-2">
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        toast={toast}
                        undoStatusUpdate={undoStatusUpdate}
                        removeToast={removeToast}
                    />
                ))}
            </div>
        </>
    );
};

export default ApplicantTable;