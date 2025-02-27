import React, { useState } from 'react';
import { FiCalendar, FiPlus, FiSend } from 'react-icons/fi';

function ApplicantDiscussionPage() {
  const [message, setMessage] = useState('');

  return (
    <div className="max-w-6xl border rounded-lg shadow-lg mx-auto my-8">
      {/* Header tabs */}
      <div className="flex w-full mb-4 rounded-lg overflow-hidden">
        <div className="bg-teal-700 text-white py-3 px-6 font-medium flex-1">Interview 1</div>
        <div className="bg-teal-50 text-teal-700 py-3 px-6 flex items-center justify-center flex-1">
          <FiPlus className="w-5 h-5" />
        </div>
      </div>

      {/* Main content card */}
      <div className="border rounded-lg shadow-sm">
        <div className="p-0">
          <div className="grid md:grid-cols-2 border-b">
            <div className="p-6 border-r">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Interview Notes and Feedbacks</h2>
              <p className="text-gray-600">Interview 1</p>
            </div>
            <div className="p-6 grid gap-4">
              <div>
                <label htmlFor="date" className="block text-gray-700 mb-1">
                  Date of Interview
                </label>
                <div className="relative">
                  <input
                    id="date"
                    type="text"
                    value="02/07/2025"
                    className="pr-10 border border-gray-300 rounded-md w-full py-2 px-3"
                    readOnly
                  />
                  <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                </div>
              </div>
              <div>
                <label htmlFor="interviewer" className="block text-gray-700 mb-1">
                  Interviewer
                </label>
                <input
                  id="interviewer"
                  type="text"
                  value="Marvin Bautista"
                  className="border border-gray-300 rounded-md w-full py-2 px-3"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-26%20at%2010.54.33%E2%80%AFAM-hMPXFRlDcnQATpHT6IQN0f9dk3Nf6D.png"
                  alt="Marvin Bautista"
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-medium text-gray-800">Marvin Bautista</h3>
            </div>

            <div className="space-y-4 text-gray-700">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dapibus fermentum vehicula. Maecenas
                eros felis, venenatis, nec elit, eu, imperdiet vulputate, massa. Nulla mattis viverra ipsum non
                volutpat. Cras vitae convallis augue. Donec iaculis enim sit amet mi convallis, at tincidunt massa
                fringilla. Sed eleifend quam ut mi mattis, in semper diam mollis. Nunc imperdiet elementum dolor in
                mollis. Curabitur molestie facilisis bibendum. Sed massa risus, tincidunt ut tellus vitae, cursus
                commodo sem. Praesent imperdiet dolor sed blandit bibendum.
              </p>
              <p>
                Proin placerat tellus vel pretium cursus. Suspendisse aliquet commodo augue, nec aliquam enim fermentum
                non. Fusce et vulputate orci. Nullam malesuada eu orci id pretium. Quisque ut dictum ligula. Morbi at
                posuere magna, et laoreet felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia curae; Morbi volutpat odio maximus dignissim interdum. Ut pharetra mi a ligula convallis
                accumsan. Etiam pharetra justo nec convallis finibus. Duis eu mauris hendrerit, ornare risus a,
                imperdiet tellus.
              </p>
            </div>
          </div>

          {/* Message input */}
          <div className="relative">
            <input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="pr-12 bg-gray-100 border border-gray-300 rounded-md w-full py-2 px-3"
            />
            <button
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-teal-700 hover:bg-teal-800 h-8 w-8 rounded-full flex items-center justify-center"
            >
              <FiSend className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicantDiscussionPage;