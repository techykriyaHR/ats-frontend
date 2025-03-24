

import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import MessageBox from "./MessageBox"; // Adjust path if needed
import moment from "moment";
import api from "../api/axios";

const InterviewNotes = ({ interview, applicant, fetchDiscussionInterview }) => {
    const [noteBody, setNoteBody] = useState("");

    const handleSubmit = () => {
        const data = {
            interview_id: interview.interview_id,
            note_type: "FIRST INTERVIEW",
            note_body: noteBody,
        }

        api.post('/interview/note', data).then((response) => {
            //trigger the change of the source data
            console.log('add note response: ', response);
            setNoteBody("");
            fetchDiscussionInterview();
        }).catch((error) => {
            console.log(error.message);
        })
    }



    return (
        <div className="border border-gray-light rounded-lg bg-white">
            {/* Box Label */}
            <div className="flex border-b border-gray-light text-gray-dark">
                <div className="flex-1 p-3 pl-5 border-r border-gray-light">
                    <p className=" display">Interview Notes And Feedback</p>
                </div>
                <div className="flex-1 py-3 px-5 space-y-2">
                    <div className="flex items-center gap-2">
                        <p className="text-gray-dark body-regular">Interviewer</p>
                        <p className="text-gray-800 border border-gray-300 rounded-md px-2">{interview.interviewer_first_name}</p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-gray-dark body-regular">Date</p>
                        <input type="date" className="border border-gray-light body-regular rounded-sm ml-2 p-1" value={moment(interview.date_of_interview).format("YYYY-MM-DD")} readOnly />
                    </div>
                </div>
            </div>

            <div className="px-6 pb-5">

                {/* Messages */}
                <div className="max-h-100 overflow-y-auto rounded-lg py-2 px-4">
                    {interview.interview_notes.map((note) =>
                    (<MessageBox
                        key={note.note_id}
                        sender={interview.interviewer_first_name}
                        date={moment(note.noted_at).format("LLL")}
                        message={note.note_body} />)
                    )}
                </div>

                {/* Message input */}
                <div className=" flex items-center gap-2">
                    <textarea
                        value={noteBody}
                        onChange={(e) => setNoteBody(e.target.value)}
                        rows="1 "
                        className="w-full p-2.5 body-regular text-gray-dark bg-white rounded-lg border border-gray-light focus:ring-blue-500 focus:border-blue-500" placeholder="Type your message..."></textarea>
                    <button
                        onClick={handleSubmit}
                        className="flex p-2 items-center justify-center rounded-full border border-gray-light bg-white hover:bg-teal-soft cursor-pointer">
                        <FiSend className="h-4 w-4 text-teal" />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default InterviewNotes;