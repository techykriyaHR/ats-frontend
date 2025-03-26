import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import MessageBox from "./MessageBox"; // Adjust path if needed
import moment from "moment";
import api from "../api/axios";

const DiscussionBox = ({ applicant, discussion, fetchDiscussionInterview }) => {
    const [noteBody, setNoteBody] = useState("");

    const handleSubmit = () => {
        const data = {
            interview_id: discussion.interview_id,
            note_type: "DISCUSSION",
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
            <div className="border-b border-gray-light p-4">
                <p className="text-gray-dark headline">Discussion Box</p>
            </div>

            <div className="px-6 max-h-150 overflow-y-auto rounded-lg py-2">
                {discussion.interview_notes.map((note) =>
                (<MessageBox
                    key={note.note_id}
                    sender={discussion.interviewer_first_name}
                    date={moment(note.noted_at).format("LLL")}
                    message={note.note_body} />)
                )}


            </div>
            {/* Message input */}
            <div className=" flex items-center m-5 mt-0 gap-2">
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
    );
};

export default DiscussionBox;
