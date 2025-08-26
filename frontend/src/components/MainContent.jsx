import React, { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FaBold, FaItalic, FaHeading } from 'react-icons/fa';
import debounce from 'lodash.debounce';

const MainContent = ({ noteContent, onSaveNote }) => {
  const [status, setStatus] = useState('Saved');

  const debouncedSave = useCallback(
    debounce((content) => {
      onSaveNote(content);
      setStatus('Saved');
    }, 2000), // 2-second debounce
    [onSaveNote]
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        codeBlock: {
          HTMLAttributes: {
            class: 'language-javascript',
            spellcheck: 'false',
          },
        },
      }),
    ],
    content: noteContent || '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg focus:outline-none',
        spellcheck: 'false',
      },
    },
    onUpdate: ({ editor }) => {
      setStatus('Saving...');
      debouncedSave(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && noteContent !== editor.getHTML()) {
      editor.commands.setContent(noteContent);
    }
  }, [noteContent, editor]);

  return (
    <div className="tiptap-editor">
      <div className="saving-indicator">{status}</div>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bubble-menu bg-dark text-white p-2 rounded d-flex gap-2">
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
              <FaHeading />
            </button>
            <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>
              <FaBold />
            </button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>
              <FaItalic />
            </button>
          </div>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default MainContent;
