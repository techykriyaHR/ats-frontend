import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import useUserStore from '../../context/userStore';
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Strike from "@tiptap/extension-strike";
import CodeBlock from "@tiptap/extension-code-block";
import Blockquote from "@tiptap/extension-blockquote";
import { generateJSON } from "@tiptap/html"; // Import the utility to convert HTML to JSON
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  ListBulletIcon,
  NumberedListIcon,
  StrikethroughIcon,
  CodeBracketIcon,
  ChatBubbleLeftRightIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  Bars3BottomLeftIcon,
  Bars3CenterLeftIcon,
  Bars3BottomRightIcon,
} from "@heroicons/react/24/outline";
import api from "../../api/axios";
import ConfirmationModal from "../Modals/ConfirmationModal";
import SendMailToast from "../../assets/SendMailToast";

function ApplicantSendMailPage({ applicant }) {
  const [subject, setSubject] = useState(
    "Welcome to FullSuite – Preparing for Your Interviews and Assessment",
  );
  const [attachments, setAttachments] = useState([]);
  const [emailContent, setEmailContent] = useState("");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showTemplateModal, setShowTemplateModal] = useState(false); // State for modal visibility
  const [templateTitle, setTemplateTitle] = useState(""); // State for template title input
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for confirmation modal
  const { user } = useUserStore();
  const [toasts, setToasts] = useState([]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Strike,
      CodeBlock,
      Blockquote,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    editorProps: {
      attributes: {
        class: 'body-regular border border-gray-light rounded-lg prose prose-sm sm:prose lg:prose-lg xl:prose-2xl min-h-100 p-5 mx-auto focus:outline-none',
      },
    },
    content: emailContent,
    onUpdate: ({ editor }) => {
      setEmailContent(editor.getHTML());
    },
  });

  const fetchTemplates = () => {
    api
      .get("/email/templates")
      .then((response) => {
        setTemplates(response.data.templates);
      })
      .catch((error) => console.error("Error fetching data:", error.message));
  };


  useEffect(() => {
    if (showTemplateModal) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = ""; // Re-enable scroll
    }

    return () => {
      // Cleanup if component unmounts
      document.body.style.overflow = "";
    };
  }, [showTemplateModal]);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleTemplateSelect = (e) => {
    const selectedTitle = e.target.value;
    const template = templates.find((t) => t.title === selectedTitle);

    if (template) {
      setSelectedTemplate(selectedTitle);
      setSubject(template.subject); // Update the subject

      // Convert the HTML content to JSON format for the editor
      const jsonContent = generateJSON(template.body, [
        StarterKit,
        Underline,
        Strike,
        CodeBlock,
        Blockquote,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
      ]);

      editor?.commands.setContent(jsonContent); // Update the editor content
      setEmailContent(template.body);
    }
  };

  const handleSaveTemplate = () => {
    if (!templateTitle) {
      alert("Please enter a title for the template.");
      return;
    }

    // Payload
    const data = {
      company_id: "468eb32f-f8c1-11ef-a725-0af0d960a833",
      title: templateTitle, // Use the user-provided title
      subject: subject,
      body: emailContent,
    };

    api
      .post("/email/add/template", data)
      .then((response) => {
        setShowTemplateModal(false); // Close the modal
        setTemplateTitle(""); // Reset the title input
        fetchTemplates(); // Refresh the templates list
      })
      .catch((error) => {
        alert("Failed to save template");
      });
  };

  const addToast = (toast) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { ...toast, id }]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id));
  };

  const handleSendEmail = () => {
    setShowConfirmationModal(true); // Show confirmation modal before sending
  };

  const confirmSendEmail = async () => {
    setShowConfirmationModal(false); // Close confirmation modal

    const formData = new FormData();
    formData.append("applicant_id", applicant.applicant_id);
    formData.append("user_id", user.user_id);
    formData.append("email_subject", subject);
    formData.append("email_body", emailContent);

    if (attachments && attachments.length > 0) {
      attachments.forEach((file) => {
        formData.append("files", file);
      });
    }

    try {
      api
        .post("/email/applicant", formData)
        .then((response) => {
          console.log(response);

          // Add success toast notification
          addToast({
            message: "Email has been sent successfully",
            recipient: applicant?.email
          });

          setEmailContent("");
          setSubject("");
          setAttachments([]);
          editor?.commands.clearContent();
        })
        .catch((error) => {
          console.error("Error sending email:", error.message);

          // Add error toast notification
          addToast({
            message: "Failed to send email",
            recipient: applicant?.email,
            error: true
          });
        });
    } catch (error) {
      console.error("Error sending email:", error);

      // Add error toast notification
      addToast({
        message: "Failed to send email",
        recipient: applicant?.email,
        error: true
      });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files); // Convert FileList to array
      setAttachments(selectedFiles); // Store multiple file
    }
  };

  useEffect(() => {
    console.log('Updated attachments: ', attachments);
  }, [attachments]);

  const handleRemoveFile = (fileName) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((file) => file.name !== fileName)
    );
    console.log("Remaining Attachment:", attachments);
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="h-full mb-5">
      {/* Toast notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <SendMailToast
            key={toast.id}
            toast={toast}
            removeToast={removeToast}
          />
        ))}
      </div>


      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <ConfirmationModal
          title="Send Email"
          message={`Are you sure you want to send this email to ${applicant?.first_name || 'the applicant'}?`}
          confirmText="Send"
          cancelText="Cancel"
          onConfirm={confirmSendEmail}
          onCancel={() => setShowConfirmationModal(false)}
        />
      )}

      {/* Modal for Adding New Template Title */}
      {showTemplateModal && (
        <div className="bg-black/50 fixed inset-0 z-50 flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center">
            <div
              role="dialog"
              aria-modal="true"
              className="rounded-lg bg-white p-6 shadow-lg max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="mb-4 text-lg font-semibold text-gray-800">Save as Template</h2>
              <p className="mb-4 text-sm text-gray-600">Provide a title for the template.</p>
              <input
                type="text"
                placeholder="Enter template title"
                value={templateTitle}
                onChange={(e) => setTemplateTitle(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="rounded-md bg-teal-600/10 px-4 py-2 text-teal-600 hover:bg-teal-600/20 hover:text-teal-700 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTemplate}
                  className="rounded-md bg-[#008080] px-4 py-2 text-white hover:bg-teal-700 text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* Email Subject */}
      <div className="mb-5 flex overflow-hidden gap-3">
        <select
          value={selectedTemplate}
          onChange={handleTemplateSelect}
          className="border border-teal text-teal body-regular bg-white p-2 rounded-lg  hover:bg-gray-light cursor-pointer"
        >
          <option value="" disabled>
            Select a Template
          </option>
          {templates.map((template) => (
            <option key={template.template_id} value={template.title}>
              {template.title}
            </option>
          ))}
        </select>
        <div className="w-full flex rounded-lg border border-gray-light">
          <span className="rounded-l-lg bg-teal px-4 py-2 text-white body-regular">
            Subject
          </span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex-1 rounded-r-lg bg-white body-regular text-gray-dark p-2 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

      </div>

      {/* Email Content */}
      <div className="mb-5 rounded-xl border border-gray-200 bg-white p-3">
        <div className="mb-4 flex gap-3 rounded-lg bg-white">
          <BoldIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => editor.chain().focus().toggleBold().run()}
          />
          <ItalicIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          />
          <UnderlineIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          />
          <ListBulletIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          />
          <Bars3BottomLeftIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          />
          <Bars3CenterLeftIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          />
          <Bars3BottomRightIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          />
        </div>
        <EditorContent
          editor={editor}
        />
      </div>

      {/* Attachments */}
      <div className="mb-5 flex border border-gray-light body-regular bg-white items-center overflow-hidden rounded-lg">
        <label
          htmlFor="file-upload"
          className="cursor-pointer rounded-l-lg bg-teal px-4 py-2 text-white"
        >
          Attachments
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            multiple
          />
        </label>
        {attachments.length > 0 ? (
          <div className="flex items-center flex-1 gap-2 ml-2">
            {attachments.map((file) => (
              <div key={file.name} className="flex items-center gap-2 bg-gray-200 px-2 py-1 rounded-lg">
                <span className="text-gray-dark">{file.name}</span>
                <button
                  onClick={() => handleRemoveFile(file.name)}
                  className="text-gray-dark hover:bg-gray-dark/20 px-0.5 cursor-pointer rounded-md"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <span className="flex-1 p-2 text-gray-dark">No files selected</span>
        )}
      </div>

      {/* Send Email Button */}
      <div className="flex items-center justify-between body-regular">
        <div className="flex items-center space-x-4">
          <select
            value={selectedTemplate}
            onChange={handleTemplateSelect}
            className="border border-teal text-teal bg-white p-2 rounded-lg hover:bg-gray-light cursor-pointer"
          >
            <option value="" disabled>
              Select a Template
            </option>
            {templates.map((template) => (
              <option key={template.template_id} value={template.title}>
                {template.title}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowTemplateModal(true)} // Open the modal
            className="border border-teal text-teal body-regular bg-white p-2 rounded-lg  hover:bg-gray-light cursor-pointer"
          >
            Save as Template
          </button>
        </div>
        <button
          onClick={handleSendEmail}
          className="rounded-lg bg-teal px-6 py-2 text-white hover:bg-teal-light cursor-pointer"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ApplicantSendMailPage;
