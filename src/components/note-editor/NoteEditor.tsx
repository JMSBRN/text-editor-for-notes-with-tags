import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addNote,
  editNote,
  deleteNote,
} from '../../features/notes/notesSlice.ts';
import { Note } from '../../features/notes/interfaces.ts';

interface NoteEditorProps {
  note?: Note;
}

function NoteEditor({ note }: NoteEditorProps) {
  const [content, setContent] = useState(note?.content || '');
  const dispatch = useDispatch();
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSaveNote = () => {
    if (note) {
      dispatch(editNote({ ...note, content }));
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        content,
      };
      dispatch(addNote(newNote));
    }
    setContent('');
  };

  const handleDeleteNote = () => {
    if (note) {
      dispatch(deleteNote(note.id));
      setContent('');
    }
  };
  return (
    <div>
      <textarea value={content} onChange={handleInputChange} />
      <button type="button" onClick={handleSaveNote}>
        {note ? 'Update Note' : 'Save Note'}
      </button>
      {note && (
        <button type="button" onClick={handleDeleteNote}>
          Delete Note
        </button>
      )}
    </div>
  );
}

NoteEditor.defaultProps = {
  note: {
    id: undefined,
    conttent: undefined,
  },
};

export default NoteEditor;
