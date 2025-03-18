import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
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

function ApplicantSendMailPage() {
  const [subject, setSubject] = useState(
    "Welcome to FullSuite – Preparing for Your Interviews and Assessment",
  );
  const [attachment, setAttachment] = useState(null);
  const [emailContent, setEmailContent] = useState("");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showTemplateModal, setShowTemplateModal] = useState(false); // State for modal visibility
  const [templateTitle, setTemplateTitle] = useState(""); // State for template title input

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Strike,
      CodeBlock,
      Blockquote,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
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

  const handleSendEmail = async () => {
    const formData = new FormData();
    formData.append("applicant_id", "37f14f12-c113-4c21-9f8a-ccf0f5b39f35");
    formData.append("user_id", "fcd3eee1-9a10-40d6-8444-b0f5b8632af1");
    formData.append("email_subject", subject);
    formData.append("email_body", emailContent);
    if (attachment) {
      formData.append("files", attachment);
    }

    try {
      api
        .post("/email/applicant", formData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.error("Error sending email:", error.message));
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Modal for Template Title */}
      {showTemplateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <div className="rounded-2xl bg-white p-6 shadow-xl w-full max-w-md">
            <h2 className="mb-3 text-lg font-medium text-gray-800">Save as Template</h2>
            <p className="text-sm text-gray-600 mb-4">Provide a title for the template.</p>
            <input
              type="text"
              placeholder="Enter template title"
              value={templateTitle}
              onChange={(e) => setTemplateTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={() => setShowTemplateModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTemplate}
                className="px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-5 flex overflow-hidden rounded-lg border border-gray-200">
        <span className="rounded-l-lg bg-teal-600 px-4 py-2 text-white">
          Subject
        </span>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="flex-1 rounded-r-lg border-none bg-white p-2 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      <div className="mb-5 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <div className="mb-4 flex gap-3 rounded-lg bg-gray-100 p-3 shadow-lg">
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
          <StrikethroughIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => editor.chain().focus().toggleStrike().run()}
          />
          <ListBulletIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          />
          <NumberedListIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          />
          <ChatBubbleLeftRightIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          />
          <CodeBracketIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          />
          <ArrowUturnLeftIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => editor.chain().focus().undo().run()}
          />
          <ArrowUturnRightIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => editor.chain().focus().redo().run()}
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
          className="min-h-[500px] rounded-lg border border-gray-200 bg-white p-4"
        />
      </div>

      <div className="mb-5 flex border border-gray-100 bg-white">
        <label
          htmlFor="file-upload"
          className="cursor-pointer rounded-md bg-teal-600 px-8 py-2 text-center text-white"
        >
          Attachment
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        <span className="ml-3 text-gray-500">
          {attachment ? attachment.name : "No file chosen"}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <select
            value={selectedTemplate}
            onChange={handleTemplateSelect}
            className="rounded-md bg-teal-600 px-4 py-2 text-center text-white hover:bg-teal-700"
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
            className="rounded-md border border-teal-600 bg-white px-6 py-2 text-teal-600 shadow-md hover:bg-teal-700 hover:text-white"
          >
            Save as Template
          </button>
        </div>
        <button
          onClick={handleSendEmail}
          className="rounded-md bg-teal-600 px-6 py-2 text-white shadow-md hover:bg-teal-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ApplicantSendMailPage;