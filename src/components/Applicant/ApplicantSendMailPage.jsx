import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

function ApplicantSendMailPage() {
  const [subject, setSubject] = useState("Welcome to FullSuite – Preparing for Your Interviews and Assessment");
  const [attachment, setAttachment] = useState(null);
  const [emailContent, setEmailContent] = useState("lorem");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleEmailContentChange = (e) => {
    setEmailContent(e.target.innerHTML);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="flex border border-gray-100 rounded-lg mb-5">
        <span className="bg-teal-600 text-white px-4 py-2">Subject</span>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="flex-1 border-none bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      {/* Email body */}
      <div className="p-6 bg-white rounded-lg border border-gray-100 mb-5">
        <div
          contentEditable
          className="w-full min-h-[500px] focus-visible:ring-0 resize-none whitespace-pre-line"
          onInput={handleEmailContentChange}
          dangerouslySetInnerHTML={{ __html: emailContent }}
        />
      </div>

      <div className="flex border border-gray-100 bg-white mb-5">
        <label htmlFor="file-upload" className="cursor-pointer bg-teal-600 text-white text-center px-8 py-2 rounded-md">
          Attachment
          <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
        </label>
        <span className="text-gray-500">{attachment ? attachment.name : "No file chosen"}</span>
      </div>

      <div className='flex justify-between'>
        <div>
          <input
            list="templates"
            id="templateInput"
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md mt-1 w-full"
            placeholder="Use Template"
          />
          <datalist id="templates">
            <option value="Template 1" />
            <option value="Template 2" />
          </datalist>
        </div>


        <div>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-md">Send</button>
        </div>
      </div>
    </div>
  );
}

export default ApplicantSendMailPage;

