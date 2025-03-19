import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import DiscussionBox from "../DiscussionBox.jsx";
import InterviewNotes from "../InterviewNotes.jsx";

function ApplicantDiscussionPage() {
  const [interviews, setInterviews] = useState(["Discussion Box"]);
  const [activeTab, setActiveTab] = useState("Discussion Box");

  const addInterview = () => {
    setInterviews([...interviews, `Interview ${interviews.length}`]);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Discussion Box":
        return <DiscussionBox />;
      default:
        return <InterviewNotes />;
    }
  };

  return (
    <div className="rounded-lg">
      {/* Header tabs */}
      <div className="mb-4 p-1 flex w-full gap-1 bg-teal-soft rounded-lg text-center items-center body-bold">
        {/* Interview tabs */}
        {interviews.map((interview) => (
          <div
            key={interview}
            className={`flex-1 py-1 font-medium rounded-lg  
            ${activeTab === interview ? "bg-teal text-white" : "text-teal hover:bg-teal-soft cursor-pointer"}`}
            onClick={() => setActiveTab(interview)}
          >
            {interview}
          </div>
        ))}

        {/* Plus Button (Hidden if limit is reached) */}
        {interviews.length < 6 && (
          <div
            className="flex flex-1 items-center justify-center rounded-lg py-1 text-teal cursor-pointer hover:bg-teal-soft"
            onClick={addInterview}
          >
            <FiPlus className="h-5 w-5" />
          </div>
        )}
      </div>

      {/* Render Active Tab */}
      {renderActiveTab()}
    </div>
  );
}

export default ApplicantDiscussionPage;
