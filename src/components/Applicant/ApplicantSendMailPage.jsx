import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Strike from "@tiptap/extension-strike";
import CodeBlock from "@tiptap/extension-code-block";
import Blockquote from "@tiptap/extension-blockquote";
import axios from "axios";
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
  const [subject, setSubject] = useState("Welcome to FullSuite – Preparing for Your Interviews and Assessment");
  const [attachment, setAttachment] = useState(null);
  const [emailContent, setEmailContent] = useState("");
  const [templates, setTemplates] = useState([]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Strike,
      CodeBlock,
      Blockquote,
      TextAlign.configure({ types: ["heading", "paragraph"] })
    ],
    content: emailContent,
    onUpdate: ({ editor }) => {
      setEmailContent(editor.getHTML());
    },
  });

  useEffect(() => {
    api.get('/emaill/templates').then(response => {
      setTemplates(response.data.templates);
    }).catch(error => console.error("Error fetching data:", error.message));
  }, [templates]);

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
      api.post('/email/applicant', formData).then(response => {
        alert("Email sent successfully");
      }).catch(error => console.error("Error fetching data:", error.message));
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex border border-gray-200 rounded-lg mb-5 overflow-hidden">
        <span className="bg-teal-600 text-white px-4 py-2 rounded-l-lg">Subject</span>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="flex-1 border-none bg-white focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-r-lg"
        />
      </div>
  
      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-md mb-5">
        <div className="flex gap-3 mb-4 shadow-lg p-3 rounded-lg bg-gray-100">
          <BoldIcon className="w-6 h-6 cursor-pointer" onClick={() => editor.chain().focus().toggleBold().run()} />
          <ItalicIcon className="w-6 h-6 cursor-pointer" onClick={() => editor.chain().focus().toggleItalic().run()} />
          <UnderlineIcon className="w-6 h-6 cursor-pointer" onClick={() => editor.chain().focus().toggleUnderline().run()} />
          <StrikethroughIcon className="w-6 h-6 cursor-pointer" onClick={() => editor.chain().focus().toggleStrike().run()} />
          <ListBulletIcon className="w-6 h-6 cursor-pointer" onClick={() => editor.chain().focus().toggleBulletList().run()} />
          <NumberedListIcon className="w-6 h-6 cursor-pointer" onClick={() => editor.chain().focus().toggleOrderedList().run()} />
          <ChatBubbleLeftRightIcon className="w-6 h-6 cursor-pointer" onClick={() => editor.chain().focus().toggleBlockquote().run()} />
          <CodeBracketIcon className="w-6 h-6 cursor-pointer" onClick={() => editor.chain().focus().toggleCodeBlock().run()} />
          <ArrowUturnLeftIcon className="w-6 h-6 cursor-pointer" onClick={() => editor.chain().focus().undo().run()} />
          <ArrowUturnRightIcon className="w-6 h-6 cursor-pointer" onClick={() => editor.chain().focus().redo().run()} />
          <Bars3BottomLeftIcon className="w-6 h-6 cursor-pointer" onClick={() => editor.chain().focus().setTextAlign('left').run()} />
          <Bars3CenterLeftIcon className="w-6 h-6 cursor-pointer" onClick={() => editor.chain().focus().setTextAlign('center').run()} />
          <Bars3BottomRightIcon className="w-6 h-6 cursor-pointer" onClick={() => editor.chain().focus().setTextAlign('right').run()} />
        </div>
        <EditorContent editor={editor} className="rounded-lg bg-white min-h-[500px] p-4 border border-gray-200" />
      </div>
  

      <div className="flex border border-gray-100 bg-white mb-5">
        <label htmlFor="file-upload" className="cursor-pointer bg-teal-600 text-white text-center px-8 py-2 rounded-md">
          Attachment
          <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
        </label>
        <span className="text-gray-500">{attachment ? attachment.name : "No file chosen"}</span>
      </div>

  
      <div className="flex justify-between items-center">
        <div>
          <input
            list="templates"
            id="templateInput"
            className="bg-teal-600 hover:bg-teal-700 text-white text-center px-4 py-2 rounded-md w-full"
            placeholder="Use Template"
          />
          <datalist id="templates">
            <option value="Template 1" />
            <option value="Template 2" />
          </datalist>
        </div>
        <button onClick={handleSendEmail} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md shadow-md">Send</button>
      </div>
    </div>
  );
}

export default ApplicantSendMailPage;