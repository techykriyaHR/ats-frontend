import React, { useState } from "react";
import { FiCalendar, FiPlus, FiSend } from "react-icons/fi";

function ApplicantDiscussionPage() {
  const [message, setMessage] = useState("");
  const [interviews, setInterviews] = useState(["Interview 1"]);
  const [activeTab, setActiveTab] = useState("Interview 1");

  const addInterview = () => {
    setInterviews([...interviews, `Interview ${interviews.length + 1}`]);
  };

  return (
    <div className="rounded-lg">
      {/* Header tabs */}
      <div className="mb-4 p-1 flex w-full gap-1 bg-teal-soft rounded-lg text-center items-center body-bold">
        {/* Interview tabs */}
        {interviews.map((interview) => (
          <div
            key={interview}
            className={`flex-1 px-5 py-1 font-medium rounded-lg cursor-pointer 
            ${activeTab === interview ? "bg-teal text-white" : "text-teal"}`}
            onClick={() => setActiveTab(interview)}
          >
            {interview}
          </div>
        ))}

        {/* Plus Button (Hidden if limit is reached) */}
        {interviews.length < 5 && (
          <div
            className="flex flex-1 items-center justify-center rounded-lg px-5 py-1 text-teal cursor-pointer hover:bg-teal-soft"
            onClick={addInterview}
          >
            <FiPlus className="h-5 w-5" />
          </div>
        )}
      </div>


      {/* Main content card */}
      <div className="rounded-lg border shadow-sm">
        <div className="p-0">
          <div className="grid border-b md:grid-cols-2">
            <div className="border-r p-6">
              <h2 className="mb-2 text-2xl font-semibold text-gray-800">
                Interview Notes and Feedbacks
              </h2>
              <p className="text-gray-600">Interview 1</p>
            </div>
            <div className="grid gap-4 p-6">
              <div>
                <label htmlFor="date" className="mb-1 block text-gray-700">
                  Date of Interview
                </label>
                <div className="relative">
                  <input
                    id="date"
                    type="text"
                    value="02/07/2025"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10"
                    readOnly
                  />
                  <FiCalendar className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
                </div>
              </div>
              <div>
                <label
                  htmlFor="interviewer"
                  className="mb-1 block text-gray-700"
                >
                  Interviewer
                </label>
                <input
                  id="interviewer"
                  type="text"
                  value="Marvin Bautista"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-26%20at%2010.54.33%E2%80%AFAM-hMPXFRlDcnQATpHT6IQN0f9dk3Nf6D.png"
                  alt="Marvin Bautista"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="font-medium text-gray-800">Marvin Bautista</h3>
            </div>

            <div className="space-y-4 text-gray-700">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                dapibus fermentum vehicula. Maecenas eros felis, venenatis, nec
                elit, eu, imperdiet vulputate, massa. Nulla mattis viverra ipsum
                non volutpat. Cras vitae convallis augue. Donec iaculis enim sit
                amet mi convallis, at tincidunt massa fringilla. Sed eleifend
                quam ut mi mattis, in semper diam mollis. Nunc imperdiet
                elementum dolor in mollis. Curabitur molestie facilisis
                bibendum. Sed massa risus, tincidunt ut tellus vitae, cursus
                commodo sem. Praesent imperdiet dolor sed blandit bibendum.
              </p>
              <p>
                Proin placerat tellus vel pretium cursus. Suspendisse aliquet
                commodo augue, nec aliquam enim fermentum non. Fusce et
                vulputate orci. Nullam malesuada eu orci id pretium. Quisque ut
                dictum ligula. Morbi at posuere magna, et laoreet felis.
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia curae; Morbi volutpat odio maximus dignissim
                interdum. Ut pharetra mi a ligula convallis accumsan. Etiam
                pharetra justo nec convallis finibus. Duis eu mauris hendrerit,
                ornare risus a, imperdiet tellus.
              </p>
            </div>
          </div>

          {/* Message input */}
          <div className="relative">
            <input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 pr-12"
            />
            <button className="absolute top-1/2 right-1 flex h-8 w-8 -translate-y-1/2 transform items-center justify-center rounded-full bg-teal-700 hover:bg-teal-800">
              <FiSend className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicantDiscussionPage;
