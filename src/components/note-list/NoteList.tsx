import React from 'react';
import { useSelector } from 'react-redux';
import { Note } from '../../features/notes/interfaces.ts';
import { selectNotes } from '../../features/notes/notesSlice.ts';

interface NoteListProps {
  onEditNote: (note: Note) => void;
}

function NoteList({ onEditNote }: NoteListProps) {
  const { notes } = useSelector(selectNotes);

  return (
    <div>
      {notes.map((note) => (
        <div key={note.id}>
          <p>{note.content}</p>
          <button type="button" onClick={() => onEditNote(note)}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
