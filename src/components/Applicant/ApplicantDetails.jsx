import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaUser } from 'react-icons/fa';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

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

function ApplicantDetails({ applicant, onTabChange, activeTab }) {
  const [applicantInfo, setApplicantInfo] = useState({});

  useEffect(() => {
    if (applicant && applicant.applicant_id) {
      axios.get(`${API_BASE_URL}/applicants/${applicant.applicant_id}`).then(({ data }) => {
        setApplicantInfo(data[0]);
      });
    }
  }, [applicant]);

  return (
    <div className="max-w-6xl border rounded-lg shadow-lg mx-auto my-8">
      <div className="grid gap-6 p-6 sm:grid-cols-2">
        {/* Left Column - Applicant Details */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">{`${applicantInfo.first_name} ${applicantInfo.middle_name} ${applicantInfo.last_name}`}</h2>
            <div className="mt-2 flex items-center text-base text-gray-500">
              <FaUser className="mr-2 h-4 w-4" />
              {applicantInfo.gender}
            </div>
            <div className="mt-1 text-base text-gray-500">{applicantInfo.birth_date}</div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-base">
              <FaEnvelope className="mr-2 h-4 w-4" />
              {applicantInfo.email_1}
            </div>
            <div className="flex items-center text-base">
              <FaPhone className="mr-2 h-4 w-4" />
              {applicantInfo.mobile_number_1}
            </div>
            {/* <div className="flex items-center text-base">
              <FaMapMarkerAlt className="mr-2 h-4 w-4" />
              {applicant.address}
            </div> */}
          </div>

          <button className="text-[#008080] hover:underline text-base">
            Applicant's Resume
          </button>
        </div>

        {/* Right Column - Application Information */}
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-x-4 text-base">
              <div className="text-[#008080]">Discovered FutSuite at</div>
              <div>{applicantInfo.applied_source}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 text-base">
              <div className="text-[#008080]">Applied for</div>
              <div>{applicantInfo.job_title}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 text-base">
              <div className="text-[#008080]">Applied on</div>
              <div>{applicantInfo.applicant_created_at}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 text-base">
              <div className="text-[#008080]">Applied from</div>
              <div>{applicantInfo.discovered_at}</div>
            </div>
          </div>
          <select
            className="border border-gray-300 p-2 rounded-md w-full md:w-52"
            defaultValue={applicant.status.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t p-4">
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'discussion' ? 'bg-[#008080] text-white' : 'bg-teal-600/10 text-teal-600 hover:bg-teal-600/20 hover:text-teal-700'}`}
          onClick={() => onTabChange('discussion')}
        >
          Discussion
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'sendMail' ? 'bg-[#008080] text-white' : 'bg-teal-600/10 text-teal-600 hover:bg-teal-600/20 hover:text-teal-700'}`}
          onClick={() => onTabChange('sendMail')}
        >
          Send Email
        </button>
      </div>
    </div>
  );
}

export default ApplicantDetails;