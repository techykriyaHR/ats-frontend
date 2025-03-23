import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import DiscussionBox from "../DiscussionBox.jsx";
import InterviewNotes from "../InterviewNotes.jsx";
import api from "../../api/axios.js"; 

function ApplicantDiscussionPage({ applicant }) {
  const [interviews, setInterviews] = useState(["Discussion Box"]);
  const [activeTab, setActiveTab] = useState("Discussion Box");
  const [interviewers, setInterviewers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [interviewDate, setInterviewDate] = useState("");
  const [noteType, setNoteType] = useState("FIRST INTERVIEW");


  //by ordering the data ascending order, we made sure that the first 
  //the discussion is the first in the array.
  let [discussion, setDiscussion] = useState(null); 
  let [interviewsArray, setInterviewsArray] = useState([]); 

  const fetchUsers = () => {
    api.get("/user/user-accounts")
      .then((response) => {
        setInterviewers(response.data.userAccounts);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const fetchDiscussionInterview = () => {
    api.get(`/interview?tracking_id=${applicant.tracking_id}`).then((response) => {
      console.log(response.data);
      
      setDiscussion(response.data[0]); 
      setInterviewsArray(response.data.slice(1));

    }).catch((error) => {
      console.log(error.message);
    }); 
  }

  const addInterview = () => {
    setIsModalOpen(true);
  };


  const handleAddInterview = () => {
    if (selectedInterviewer && interviewDate && noteType) {

      const data = {
        tracking_id: applicant.tracking_id,
        interviewer_id: selectedInterviewer.user_id,
        date_of_interview: interviewDate,
        note_type: noteType
      }

      console.log(data);
      
      api.post('/interview', data).then((response) => {
        console.log(response.data);
        setInterviews([...interviews, `Interview ${interviews.length}`]);
        setIsModalOpen(false);
      }).catch((error) => {
        console.error(error.message);
      });
    }
  };




  useEffect(() => {
    fetchDiscussionInterview(); 
    fetchUsers(); 
  }, []);


  //by ordering the 
  const renderActiveTab = () => {
    switch (activeTab) {
      case "Discussion Box":
        return <DiscussionBox applicant={applicant} discussion={discussion} fetchDiscussionInterview={fetchDiscussionInterview}/>;
      default:
        return <InterviewNotes interview={activeTab} />;
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <div className="rounded-2xl bg-white p-6 shadow-xl w-full max-w-md">
            <h2 className="mb-3 text-lg font-medium text-gray-800">Add Interview Details</h2>
            <p className="text-sm text-gray-600 mb-4">Select an interviewer, date, and note type.</p>
            
            <label className="block text-sm font-medium text-gray-700 mb-1">Interviewer</label>
            <select
              className="w-full rounded-lg border border-gray-300 p-2 mb-4"
              onChange={(e) => setSelectedInterviewer(interviewers.find(user => user.user_id === e.target.value))}
            >
              <option value="">Choose an interviewer</option>
              {interviewers.map((interviewer) => (
                <option key={interviewer.user_id} value={interviewer.user_id}>{interviewer.first_name}</option>
              ))}
            </select>

            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Interview</label>
            <input
              type="date"
              className="w-full rounded-lg border border-gray-300 p-2 mb-4"
              onChange={(e) => setInterviewDate(e.target.value)}
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Note Type</label>
            <select
              className="w-full rounded-lg border border-gray-300 p-2 mb-4"
              value={noteType}
              onChange={(e) => setNoteType(e.target.value)}
            >
              <option value="FIRST INTERVIEW">First Interview</option>
              <option value="SECOND INTERVIEW">Second Interview</option>
              <option value="THIRD INTERVIEW">Third Interview</option>
            </select>

            <div className="flex justify-end mt-6 space-x-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Cancel</button>
              <button onClick={handleAddInterview} className="px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicantDiscussionPage;
