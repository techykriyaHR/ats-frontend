import React, { useState, useEffect } from "react";
import ApplicantDetails from "../components/Applicant/ApplicantDetails";
import ApplicantDiscussionPage from "../components/Applicant/ApplicantDiscussionPage";
import ApplicantSendMailPage from "../components/Applicant/ApplicantSendMailPage";
import api from "../api/axios";
import Loader from "../assets/Loader";

function ApplicantDetailsPage({ applicant }) {
  const [activeTab, setActiveTab] = useState("discussion");
  const [loading, setLoading] = useState(true);
  const [applicantInfo, setApplicantInfo] = useState({});

  useEffect(() => {
    setLoading(true);
    setApplicantInfo({});

    if (applicant && applicant.applicant_id) {
      console.log("Fetching applicant data for ID:", applicant.applicant_id);
      api.get(`/applicants/${applicant.applicant_id}`)
        .then(({ data }) => {
          if (data && data.length > 0) {
            console.log("Fetched applicant data:", data);
            setApplicantInfo(data[0]);
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
      setLoading(false);
    }
  }, [applicant]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "discussion":
        return <ApplicantDiscussionPage
          applicant={applicantInfo}
        />;
      case "sendMail":
        return <ApplicantSendMailPage applicant={applicantInfo} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader />
      </div>
    );
  }

  // If no applicant is selected or data couldn't be fetched
  if (!applicant || !applicantInfo.first_name) {
    return (
      <div className="border rounded-lg mx-auto text-center p-5">
        <p className="text-gray-500">Select an applicant to view details</p>
      </div>
    );
  }

  return (
    <div className="">
      <ApplicantDetails
        applicant={applicantInfo}
        onTabChange={setActiveTab}
        activeTab={activeTab}
        onApplicantUpdate={(updatedInfo) => setApplicantInfo(updatedInfo)}
      />
      <div className="mt-4 mb-10">{renderActiveTab()}</div>
    </div>
  );
}

export default ApplicantDetailsPage;