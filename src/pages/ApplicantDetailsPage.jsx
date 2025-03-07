import React, { useState, useEffect } from 'react';
import ApplicantDetails from '../components/Applicant/ApplicantDetails';
import ApplicantDiscussionPage from '../components/Applicant/ApplicantDiscussionPage';
import ApplicantSendMailPage from '../components/Applicant/ApplicantSendMailPage';

function ApplicantDetailsPage({ applicant }) {
  const [activeTab, setActiveTab] = useState('discussion');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'discussion':
        return <ApplicantDiscussionPage />;
      case 'sendMail':
        return <ApplicantSendMailPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <ApplicantDetails applicant={applicant} onTabChange={setActiveTab} activeTab={activeTab} />
      <div className="mt-4">
        {renderActiveTab()}
      </div>
    </div>
  );
}

export default ApplicantDetailsPage;