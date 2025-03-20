import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import moment from 'moment';
import api from '../api/axios';
import Toast from '../assets/Toast';
import Loader from '../assets/Loader';
import { useApplicantData } from '../hooks/useApplicantData';
import positionStore from '../context/positionStore';
import { initialStages } from '../utils/StagesData';
import { useStages } from '../hooks/useStages';
import { filterCounter } from '../utils/statusCounterFunctions';
import Cookies from "js-cookie";
import applicantFilterStore from '../context/applicantFilterStore';
import useUserStore from '../context/userStore';
import useLoadingStore from '../context/loadingStore';

const statusMapping = {
  "NONE": "White Listed",
  "TEST_SENT": "Test Sent",
  "INTERVIEW_SCHEDULE_SENT": "Interview Schedule Sent",
  "FIRST_INTERVIEW": "First Interview",
  "SECOND_INTERVIEW": "Second Interview",
  "THIRD_INTERVIEW": "Third Interview",
  "FOURTH_INTERVIEW": "Fourth Interview",
  "FOLLOW_UP_INTERVIEW": "Follow Up Interview",
  "FOR_JOB_OFFER": "For Job Offer",
  "JOB_OFFER_REJECTED": "Job Offer Rejected",
  "JOB_OFFER_ACCEPTED": "Job Offer Accepted",
  "WITHDREW_APPLICATION": "Withdrew Application",
  "BLACKLISTED": "Blacklisted",
  "NOT_FIT": "Not Fit",
};

const ApplicantTable = ({ onSelectApplicant }) => {
  const { applicantData, setApplicantData, statuses, setStatuses, updateApplicantStatus } = useApplicantData();
  const [toasts, setToasts] = useState([]);
  const { positionFilter, setPositionFilter } = positionStore();
  const { setStages } = useStages();
  const { status } = applicantFilterStore();
  const { user } = useUserStore();
  const { loading, setLoading } = useLoadingStore();
  const [toastTimeouts, setToastTimeouts] = useState({});

  // Initial data loading
  useEffect(() => {
    const fetchData = async () => {
      // Set loading state to true before fetching
      setLoading(true);
      
      try {
        // Fetch applicant data and statuses simultaneously
        const [applicantResponse, statusResponse] = await Promise.all([
          api.get('/applicants'),
          api.get('/statuses')
        ]);
        
        // Update state with fetched data
        setApplicantData(applicantResponse.data);
        setStatuses(statusResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        // Always set loading to false after operations complete
        setLoading(false);
      }
    };

    fetchData();
  }, [setApplicantData, setStatuses, setLoading]);

  // Clean up any active toast timeouts when component unmounts
  useEffect(() => {
    return () => {
      Object.values(toastTimeouts).forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
    };
  }, [toastTimeouts]);

  // Handle updating applicant status
  const updateStatus = async (id, progress_id, Status, status) => {
    const data = {
      "progress_id": progress_id,
      "status": Status,
      "user_id": user.user_id,
    };
    
    try {
      await api.put(`/applicant/update/status`, data);
      
      // Update local state
      updateApplicantStatus(id, Status);
      
      // Show toast notification
      const applicant = applicantData.find(applicant => applicant.applicant_id === id);
      addToast(applicant, Status);
      
      // Update filters and counters
      filterCounter(positionFilter, setStages, initialStages, setPositionFilter, status);
    } catch (error) {
      console.error("Update Status Failed: " + error);
    }
  };

  // Add a new toast notification
  const addToast = (applicant, status) => {
    const toastId = Date.now();
    const newToast = {
      id: toastId,
      applicant,
      status: statusMapping[status] || status,
      previousStatus: statusMapping[applicant.status] || applicant.status
    };

    setToasts(prevToasts => [...prevToasts, newToast]);

    // Set timeout to auto-remove toast after 10 seconds
    const timeoutId = setTimeout(() => removeToast(toastId), 10000);
    setToastTimeouts(prev => ({ ...prev, [toastId]: timeoutId }));
  };

  // Remove a toast notification
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

  // Handle undoing a status update
  const undoStatusUpdate = async (toast) => {
    const { applicant, previousStatus } = toast;
    
    try {
      // Find the original status key
      const originalStatus = Object.keys(statusMapping).find(key => statusMapping[key] === previousStatus);
      
      // Create the data object for the API call
      const data = {
        "progress_id": applicant.progress_id,
        "status": originalStatus,
        "user_id": user.user_id,
      };

      // Make the API call
      await api.put(`/applicant/update/status`, data);

      // Update the local state
      setApplicantData(prevData =>
        prevData.map(app =>
          app.applicant_id === applicant.applicant_id
            ? { ...app, status: originalStatus }
            : app
        )
      );

      // Remove the toast
      removeToast(toast.id);
      
      // Update filters and counters
      filterCounter(positionFilter, setStages, initialStages, setPositionFilter, status);
    } catch (error) {
      console.error("Undo status update failed:", error);
    }
  };

  // Handle status change from dropdown
  const handleStatusChange = (id, progress_id, newStatus, status) => {
    updateStatus(id, progress_id, newStatus, status);
  };

  // Handle row click to view applicant details
  const handleApplicantRowClick = (row) => {
    const applicant = applicantData.find((applicant) => applicant.applicant_id === row.applicant_id);
    if (applicant) {
      onSelectApplicant(applicant);
    }
  };

  // DataTable columns configuration
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
          onChange={(e) => handleStatusChange(row.applicant_id, row.progress_id, e.target.value, status)}
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
        />
      )}
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