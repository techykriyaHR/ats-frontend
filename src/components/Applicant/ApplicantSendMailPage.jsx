import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

function ApplicantSendMailPage() {
  const [subject, setSubject] = useState(
    "Welcome to FullSuite – Preparing for Your Interviews and Assessment",
  );
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const [emailContent, setEmailContent] = useState(`
Dear Juniper Williams,

Thank you for applying to FullSuite! We're excited to have you as a candidate and look forward to the opportunity to learn more about you.

What to Expect in the Interview Process:
• Interview Schedule: We'll soon be in touch to arrange the first round of interviews. Please keep an eye on your inbox for an invitation to select a convenient time slot.
• Interview Format: Depending on the role, you may have a combination of virtual and in-person interviews. We'll provide all the necessary details, including any preparation materials or topics you should be familiar with.
• Pre-Interview Assessment: Before proceeding with the interviews, we require all candidates to complete an assessment designed to evaluate your technical skills for the Software Engineer Role. This test helps us ensure that your skills align with the job requirements.
• Test Details: You'll receive an email with a link to the test within the next 48 hours. The test should take approximately 30 minutes to complete.
• Deadline: Please complete the test by August 26, 2024.
• Preparation: No special preparation is needed, but we suggest reviewing [any relevant material or topics]. If you encounter any issues or need assistance, feel free to contact us.
• Who You'll Meet: During the interview process, you'll have the chance to meet with key team members and leaders at [Your Company Name]. This is your opportunity to get to know us as much as it is for us to learn about you.

Next Steps:
Once you've completed the assessment, and your test results have been reviewed, we'll follow up to schedule your interviews. We'll send you a confirmation email with all the details you need. Should you have any scheduling constraints, please let us know, and we'll do our best to accommodate you.

If you have any questions about the test or the interview process, don't hesitate to reach out to us at percy@fullsuite.ph or 09123456789. We're here to help and ensure you feel confident and prepared.

We're looking forward to meeting you and wish you the best of luck with the assessment and interview process.

Best regards,
Ivan Percival Viniegas
  `);

  const templates = Array(8).fill("Sample Template");

  const handleTemplateSelect = (index) => {
    setSelectedTemplate(index);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleEmailContentChange = (e) => {
    setEmailContent(e.target.innerHTML);
  };

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-gray-50 p-4 md:flex-row">
      {/* Left sidebar - Template selection */}
      <div className="w-full rounded-lg bg-white p-6 shadow-sm md:w-80">
        <h2 className="mb-4 text-sm font-medium text-teal-700">
          Choose an email template:
        </h2>
        <div className="space-y-3">
          {templates.map((template, index) => (
            <button
              key={index}
              className={`h-12 w-full justify-start border text-left font-normal ${
                selectedTemplate === index
                  ? "border-teal-600"
                  : "border-gray-200"
              }`}
              onClick={() => handleTemplateSelect(index)}
            >
              {template}
            </button>
          ))}
          <button className="h-12 w-full justify-center border-dashed border-gray-300">
            <FaPlus className="h-4 w-4 text-teal-600" />
          </button>
        </div>
      </div>

      {/* Right side - Email composition */}
      <div className="flex-1">
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          {/* Subject line */}
          <div className="flex border-b">
            <div className="flex items-center bg-teal-600 px-4 py-2 text-white">
              <span>Subject</span>
            </div>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {/* Email body */}
          <div className="p-6">
            <div
              contentEditable
              className="min-h-[500px] w-full resize-none border-none whitespace-pre-line focus-visible:ring-0"
              onInput={handleEmailContentChange}
              dangerouslySetInnerHTML={{ __html: emailContent }}
            />
          </div>

          {/* Attachment and send buttons */}
          <div className="flex justify-between border-t p-4">
            <div className="flex">
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="rounded-md bg-teal-600 px-4 py-2 text-white">
                  Attachment
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <div className="ml-4 flex items-center text-gray-500">
                {attachment ? attachment.name : "No file chosen"}
              </div>
            </div>
            <button className="rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-700">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicantSendMailPage;
