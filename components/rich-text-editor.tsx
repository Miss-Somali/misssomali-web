"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "prose max-w-none dark:prose-invert min-h-[300px] max-h-[600px] overflow-y-auto focus:outline-none p-4 text-dark dark:text-white leading-relaxed text-sm",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  // Sync value from external source (e.g. initial form load)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="rounded-xl border border-stroke dark:border-dark-3 overflow-hidden bg-white dark:bg-dark-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border-b border-stroke p-2 bg-gray-50 dark:bg-dark-3 dark:border-dark-3">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-4 text-dark dark:text-white transition-colors ${
            editor.isActive("bold") ? "bg-gray-200 dark:bg-dark-4 font-bold" : ""
          }`}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-4 text-dark dark:text-white transition-colors ${
            editor.isActive("italic") ? "bg-gray-200 dark:bg-dark-4" : ""
          }`}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <div className="w-[1px] bg-stroke dark:bg-dark-4 my-1 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-4 text-dark dark:text-white transition-colors ${
            editor.isActive("heading", { level: 2 }) ? "bg-gray-200 dark:bg-dark-4" : ""
          }`}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-4 text-dark dark:text-white transition-colors ${
            editor.isActive("heading", { level: 3 }) ? "bg-gray-200 dark:bg-dark-4" : ""
          }`}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </button>
        <div className="w-[1px] bg-stroke dark:bg-dark-4 my-1 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-4 text-dark dark:text-white transition-colors ${
            editor.isActive("bulletList") ? "bg-gray-200 dark:bg-dark-4" : ""
          }`}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-4 text-dark dark:text-white transition-colors ${
            editor.isActive("orderedList") ? "bg-gray-200 dark:bg-dark-4" : ""
          }`}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-4 text-dark dark:text-white transition-colors ${
            editor.isActive("blockquote") ? "bg-gray-200 dark:bg-dark-4" : ""
          }`}
          title="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </button>
        <div className="w-[1px] bg-stroke dark:bg-dark-4 my-1 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-4 text-dark dark:text-white disabled:opacity-50 transition-colors"
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-4 text-dark dark:text-white disabled:opacity-50 transition-colors"
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </button>
      </div>

      {/* Editor Space */}
      <EditorContent editor={editor} />
    </div>
  );
}
