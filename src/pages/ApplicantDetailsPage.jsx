import React, { useState } from "react";
import ApplicantDetails from "../components/Applicant/ApplicantDetails";
import ApplicantDiscussionPage from "../components/Applicant/ApplicantDiscussionPage";
import ApplicantSendMailPage from "../components/Applicant/ApplicantSendMailPage";

function ApplicantDetailsPage({ applicant }) {
  const [activeTab, setActiveTab] = useState("discussion");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "discussion":
        return <ApplicantDiscussionPage
          applicant={applicant}
        />;
      case "sendMail":
        return <ApplicantSendMailPage applicant={applicant} />;
      default:
        return null;
    }
  };

  return (
    <div className="">
      <ApplicantDetails
        applicant={applicant}
        onTabChange={setActiveTab}
        activeTab={activeTab}
      />
      <div className="mt-4 mb-10">{renderActiveTab()}</div>
    </div>
  );
}

export default ApplicantDetailsPage;