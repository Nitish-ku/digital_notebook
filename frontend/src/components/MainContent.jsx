import React, { useEffect } from 'react';
import { useEditor, EditorContent, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FaBold, FaItalic, FaHeading, FaQuoteRight, FaCode } from 'react-icons/fa';

const MainContent = ({ noteContent, onSaveNote }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    content: noteContent || '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg focus:outline-none',
      },
    },
    onBlur: ({ editor }) => {
      onSaveNote(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && noteContent !== editor.getHTML()) {
      editor.commands.setContent(noteContent);
    }
  }, [noteContent, editor]);

  return (
    <div className="main-content-editor container my-5">
      {editor && (
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="floating-menu bg-dark text-white p-2 rounded d-flex gap-2">
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
              <FaHeading /> H1
            </button>
            <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>
              <FaBold />
            </button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>
              <FaItalic />
            </button>
            <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'is-active' : ''}>
              <FaQuoteRight />
            </button>
            <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''}>
              <FaCode />
            </button>
          </div>
        </FloatingMenu>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default MainContent;
