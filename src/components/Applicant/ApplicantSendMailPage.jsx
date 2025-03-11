import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Strike from "@tiptap/extension-strike";
import CodeBlock from "@tiptap/extension-code-block";
import Blockquote from "@tiptap/extension-blockquote";
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

function ApplicantSendMailPage() {
  const [subject, setSubject] = useState("Welcome to FullSuite – Preparing for Your Interviews and Assessment");
  const [attachment, setAttachment] = useState(null);
  const [emailContent, setEmailContent] = useState("<p>lorem</p>");

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

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  if (!editor) {
    return null;
  }

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

      <div className="p-6 bg-white rounded-lg border border-gray-100 mb-5">
        <div className="flex gap-3 mb-2">
          <BoldIcon className="size-5 cursor-pointer" onClick={() => editor.chain().focus().toggleBold().run()} />
          <ItalicIcon className="size-5 cursor-pointer" onClick={() => editor.chain().focus().toggleItalic().run()} />
          <UnderlineIcon className="size-5 cursor-pointer" onClick={() => editor.chain().focus().toggleUnderline().run()} />
          <StrikethroughIcon className="size-5 cursor-pointer" onClick={() => editor.chain().focus().toggleStrike().run()} />
          <ListBulletIcon className="size-6 cursor-pointer" onClick={() => editor.chain().focus().toggleBulletList().run()} />
          <NumberedListIcon className="size-5 cursor-pointer" onClick={() => editor.chain().focus().toggleOrderedList().run()} />
          <ChatBubbleLeftRightIcon className="size-5 cursor-pointer" onClick={() => editor.chain().focus().toggleBlockquote().run()} />
          <CodeBracketIcon className="size-5 cursor-pointer" onClick={() => editor.chain().focus().toggleCodeBlock().run()} />
          <ArrowUturnLeftIcon className="size-5 cursor-pointer" onClick={() => editor.chain().focus().undo().run()} />
          <ArrowUturnRightIcon className="size-5 cursor-pointer" onClick={() => editor.chain().focus().redo().run()} />
          <Bars3BottomLeftIcon className="size-5 cursor-pointer" onClick={() => editor.chain().focus().setTextAlign('left').run()} />
          <Bars3CenterLeftIcon className="size-5 cursor-pointer" onClick={() => editor.chain().focus().setTextAlign('center').run()} />
          <Bars3BottomRightIcon className="size-5 cursor-pointer" onClick={() => editor.chain().focus().setTextAlign('right').run()} />
        </div>
        <EditorContent editor={editor} className="border p-2 rounded bg-white min-h-[500px]" />
      </div>

      <div className="flex border border-gray-100 bg-white mb-5">
        <label htmlFor="file-upload" className="cursor-pointer bg-teal-600 text-white text-center px-8 py-2 rounded-md">
          Attachment
          <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
        </label>
        <span className="text-gray-500">{attachment ? attachment.name : "No file chosen"}</span>
      </div>

      <div className="flex justify-between">
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
