import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaUser } from 'react-icons/fa';
import useUserStore from '../../context/userStore';
import api from '../../api/axios';
import Loader from '../../assets/Loader';
import Toast from '../../assets/Toast';

const statuses = [
  "Test Sent",
  "Interview Schedule Sent",
  "First Interview",
  "Second Interview",
  "Third Interview",
  "Fourth Interview",
  "Follow Up Interview",
  "Job Offer Accepted",
  "Withdrew Application",
  "Blacklisted",
  "Not Fit",
];

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

function ApplicantDetails({ applicant, onTabChange, activeTab }) {
  const [applicantInfo, setApplicantInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [toasts, setToasts] = useState([]);
  const { user } = useUserStore();

  // Reset state when applicant changes
  useEffect(() => {
    setLoading(true);
    setApplicantInfo({});
    setStatus('');
    
    if (applicant && applicant.applicant_id) {
      console.log("Fetching applicant data for ID:", applicant.applicant_id);
      api.get(`/applicants/${applicant.applicant_id}`)
        .then(({ data }) => {
          if (data && data.length > 0) {
            console.log("Fetched applicant data:", data);
            setApplicantInfo(data[0]);
            setStatus(statusMapping[data[0].status] || '');
          } else {
            console.error("No applicant data returned");
          }
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching applicant data:", error);
          setLoading(false);
        });
    } else {
      // If no applicant is selected, exit loading state
      setLoading(false);
    }
  }, [applicant]); // Only depend on the applicant prop

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    const previousStatus = status; // Store previous status
    const previousBackendStatus = applicantInfo.status; // Store previous backend status
    
    setStatus(newStatus);
    
    // Update the applicant status in the backend
    if (applicant && applicant.applicant_id) {
      const backendStatus = Object.keys(statusMapping).find(key => statusMapping[key] === newStatus);
      let data = {
        "progress_id": applicantInfo.progress_id,
        "status": backendStatus
      };
      try {
        await api.put(`/applicant/update/status`, data);
        setApplicantInfo(prevInfo => ({ ...prevInfo, status: backendStatus }));
        console.log("Status updated successfully");

        // Add toast message with previous status information
        setToasts([...toasts, { 
          id: Date.now(), 
          applicant: applicantInfo, 
          status: newStatus,
          previousStatus: previousStatus,
          previousBackendStatus: previousBackendStatus
        }]);
      } catch (error) {
        console.error("Error updating status:", error);
        // Revert status on error
        setStatus(statusMapping[applicantInfo.status]);
      }
    }
  };

  const undoStatusUpdate = async (toast) => {
    // Use the previous status stored in the toast object
    const backendStatus = toast.previousBackendStatus;

    let data = {
      "progress_id": applicantInfo.progress_id,
      "status": backendStatus
    };

    try {
      await api.put(`/applicant/update/status`, data);
      setApplicantInfo(prevInfo => ({ ...prevInfo, status: backendStatus }));
      setStatus(toast.previousStatus);
      setToasts(toasts.filter(t => t.id !== toast.id));
      console.log("Status reverted successfully");
    } catch (error) {
      console.error("Error reverting status:", error);
    }
  };

  const removeToast = (id) => {
    setToasts(toasts.filter(t => t.id !== id));
  };

  if (loading) {
    return <Loader />;
  }

  // If no applicant is selected or data couldn't be fetched
  if (!applicant || !applicantInfo.first_name) {
    return (
      <div className="max-w-6xl border rounded-lg shadow-lg mx-auto my-8 p-8 text-center">
        <p className="text-gray-500">Select an applicant to view details</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl border rounded-lg shadow-lg mx-auto my-8">
      <div className="grid gap-6 p-6 sm:grid-cols-2">
        {/* Left Column - Applicant Details */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">
              {`${applicantInfo.first_name || ''} ${applicantInfo.middle_name || ''} ${applicantInfo.last_name || ''}`}
            </h2>
            <div className="mt-2 flex items-center text-base text-gray-500">
              <FaUser className="mr-2 h-4 w-4" />
              {applicantInfo.gender || 'Not specified'}
            </div>
            <div className="mt-1 text-base text-gray-500">
              {applicantInfo.birth_date ? new Date(applicantInfo.birth_date).toLocaleDateString() : 'No birth date'}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-base">
              <FaEnvelope className="mr-2 h-4 w-4" />
              {applicantInfo.email_1 || 'No email provided'}
            </div>
            <div className="flex items-center text-base">
              <FaPhone className="mr-2 h-4 w-4" />
              {applicantInfo.mobile_number_1 || 'No phone number provided'}
            </div>
            {applicantInfo.address && (
              <div className="flex items-center text-base">
                <FaMapMarkerAlt className="mr-2 h-4 w-4" />
                {applicantInfo.address}
              </div>
            )}
          </div>

          {applicantInfo.resume_url && (
            <a 
              href={applicantInfo.resume_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#008080] hover:underline text-base block"
            >
              Applicant's Resume
            </a>
          )}
        </div>

        {/* Right Column - Application Information */}
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-x-4 text-base">
              <div className="text-[#008080]">Discovered FutSuite at</div>
              <div>{applicantInfo.discovered_at || 'Not specified'}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 text-base">
              <div className="text-[#008080]">Applied for</div>
              <div>{applicantInfo.job_title || 'Not specified'}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 text-base">
              <div className="text-[#008080]">Applied on</div>
              <div>
                {applicantInfo.applicant_created_at ? 
                  new Date(applicantInfo.applicant_created_at).toLocaleDateString() : 
                  'Not specified'}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 text-base">
              <div className="text-[#008080]">Applied from</div>
              <div>{applicantInfo.discovered_at || 'Not specified'}</div>
            </div>
          </div>
          <select
            className="border border-gray-300 p-2 rounded-md w-full md:w-52"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="" disabled>Select status</option>
            {statuses.map((statusOption) => (
              <option key={statusOption} value={statusOption}>
                {statusOption}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t p-4">
        {user.feature_names["60c8341f-fa4b-11ef-a725-0af0d960a833"] === "Interview Notes" && (
          <button
            className={`px-4 py-2 rounded-md ${activeTab === 'discussion' ? 'bg-[#008080] text-white' : 'bg-teal-600/10 text-teal-600 hover:bg-teal-600/20 hover:text-teal-700'}`}
            onClick={() => onTabChange('discussion')}
          >
            Discussion
          </button>
        )}
        {user.feature_names["60c834d5-fa4b-11ef-a725-0af0d960a833"] === "Send Email" && (
          <button
            className={`px-4 py-2 rounded-md ${activeTab === 'sendMail' ? 'bg-[#008080] text-white' : 'bg-teal-600/10 text-teal-600 hover:bg-teal-600/20 hover:text-teal-700'}`}
            onClick={() => onTabChange('sendMail')}
          >
            Send Email
          </button>
        )}
      </div>

      {/* Toast Messages */}
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            toast={toast}
            undoStatusUpdate={undoStatusUpdate}
            removeToast={removeToast}
          />
        ))}
      </div>
    </div>
  );
}

export default ApplicantDetails;