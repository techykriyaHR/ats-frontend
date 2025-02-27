import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaUser } from 'react-icons/fa';

function ApplicantDetails({ applicant, onTabChange, activeTab }) {
  return (
    <div className="max-w-6xl border rounded-lg shadow-lg mx-auto my-8">
      <div className="grid gap-6 p-6 sm:grid-cols-2">
        {/* Left Column - Applicant Details */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">{applicant.name}</h2>
            <div className="mt-2 flex items-center text-base text-gray-500">
              <FaUser className="mr-2 h-4 w-4" />
              {applicant.gender}
            </div>
            <div className="mt-1 text-base text-gray-500">{applicant.birthdate}</div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-base">
              <FaEnvelope className="mr-2 h-4 w-4" />
              {applicant.email}
            </div>
            <div className="flex items-center text-base">
              <FaPhone className="mr-2 h-4 w-4" />
              {applicant.phone}
            </div>
            <div className="flex items-center text-base">
              <FaMapMarkerAlt className="mr-2 h-4 w-4" />
              {applicant.address}
            </div>
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
              <div>{applicant.source}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 text-base">
              <div className="text-[#008080]">Applied for</div>
              <div>{applicant.position}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 text-base">
              <div className="text-[#008080]">Applied on</div>
              <div>{applicant.dateApplied}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 text-base">
              <div className="text-[#008080]">Applied from</div>
              <div>{applicant.referrer}</div>
            </div>
          </div>

          <select className="border border-gray-300 p-2 rounded-md w-full text-base" defaultValue={applicant.status}>
            <option value="first-interview">First Interview Stage</option>
            <option value="second-interview">Second Interview</option>
            <option value="final-interview">Final Interview</option>
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