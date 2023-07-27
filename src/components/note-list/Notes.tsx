import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks.ts';
import { selectNotes } from '../../features/notes/notesSlice.ts';
import NoteComponent from '../note/NoteComponent.tsx';
import { fetchItems } from '../../features/notes/thunks/NotesDbThunks.ts';
import { dbReady } from '../../indexed-db/indexedDB.ts';

function Notes() {
  const { notes, status } = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchItemsFromIndexedDB = async () => {
      try {
        await dbReady; // Wait for the database to be ready
        await dispatch(fetchItems());
      } catch (error) {
        throw new Error();
      }
    };

    fetchItemsFromIndexedDB();
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>error</div>;
  }

  return (
    <div className="notes">
      {notes.map((note) => (
        <div key={note.id}>{!note.hidden && <NoteComponent note={note} />}</div>
      ))}
    </div>
  );
}

export default Notes;
