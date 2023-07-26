import React from 'react';
import { useAppSelector } from '../../hooks/storeHooks.ts';
import { selectNotes } from '../../features/notes/notesSlice.ts';
import Note from '../note/Note.tsx';

function Notes() {
  const { notes } = useAppSelector(selectNotes);

  return (
    <div className="notes">
      {notes.map((note) => (
        <div key={note.id}>{!note.hidden && <Note note={note} />}</div>
      ))}
    </div>
  );
}

export default Notes;
