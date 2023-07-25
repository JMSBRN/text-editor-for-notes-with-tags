import React from 'react';
import { useAppSelector } from '../../hooks/storeHooks.ts';
import { selectNotes } from '../../features/notes/notesSlice.ts';
import ContnetText from '../content-text/ContentText.tsx';

function Notes() {
  const { notes } = useAppSelector(selectNotes);
  return (
    <div className="notes">
      {notes.map((note) => (
        <div key={note.id}>
          {!note.hidden && (
            <div key={note.id} className="">
              <div className="id">{note.id}</div>
              <ContnetText highlightElements={note.content} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Notes;
