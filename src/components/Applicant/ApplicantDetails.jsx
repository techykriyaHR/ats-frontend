import React, { useEffect } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaUser } from 'react-icons/fa';

function ApplicantDetails({ applicant, onTabChange, activeTab }) {
  useEffect(() => {
    console.log('Applicant:', applicant);
  }, [applicant]);

  if (!applicant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl border rounded-lg shadow-lg mx-auto my-8">
      <div className="grid gap-6 p-6 sm:grid-cols-2">
        {/* Left Column - Applicant Details */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">{`${applicant.first_name} ${applicant.middle_name || ''} ${applicant.last_name}`}</h2>
            <div className="mt-2 flex items-center text-base text-gray-500">
              <FaUser className="mr-2 h-4 w-4" />
              {applicant.gender || 'N/A'}
            </div>
            <div className="mt-1 text-base text-gray-500">{applicant.birth_date ? new Date(applicant.birth_date).toLocaleDateString() : 'N/A'}</div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-base">
              <FaEnvelope className="mr-2 h-4 w-4" />
              {applicant.email || 'N/A'}
            </div>
            <div className="flex items-center text-base">
              <FaPhone className="mr-2 h-4 w-4" />
              {applicant.phone || 'N/A'}
            </div>
            <div className="flex items-center text-base">
              <FaMapMarkerAlt className="mr-2 h-4 w-4" />
              {applicant.address || 'N/A'}
            </div>
          </div>

          <button className="text-[#008080] hover:underline text-base">
            <a href={applicant.cv_link || '#'} target="_blank" rel="noopener noreferrer">Applicant's Resume</a>
          </button>
        </div>

        {/* Right Column - Application Information */}
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-x-4 text-base">
              <div className="text-[#008080]">Discovered FutSuite at</div>
              <div>{applicant.source || 'N/A'}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 text-base">
              <div className="text-[#008080]">Applied for</div>
              <div>{applicant.title || 'N/A'}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 text-base">
              <div className="text-[#008080]">Applied on</div>
              <div>{new Date(applicant.date_created).toLocaleDateString()}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 text-base">
              <div className="text-[#008080]">Applied from</div>
              <div>{applicant.referrer || 'N/A'}</div>
            </div>
          </div>

          <select className="border border-gray-300 p-2 rounded-md w-full text-base" defaultValue={applicant.status}>
            <option value="Sent Test">Sent Test</option>
            <option value="First Interview Stage">First Interview Stage</option>
            <option value="Final Interview Stage">Final Interview Stage</option>
            <option value="Job Offer Sent">Job Offer Sent</option>
            <option value="Abandoned">Abandoned</option>
            <option value="Blacklisted">Blacklisted</option>
            <option value="No Show">No Show</option>
            <option value="Not Fit">Not Fit</option>
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