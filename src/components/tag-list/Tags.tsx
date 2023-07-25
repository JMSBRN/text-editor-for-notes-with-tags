import React from 'react';
import { cutSymbolIfExist } from '../../features/notes/utilsForNotes.ts';
import { NoteHook } from '../../features/notes/interfaces.ts';
import { editNote } from '../../features/notes/notesSlice.ts';
import { useAppDispatch } from '../../hooks/storeHooks.ts';

function Tags({ notes }: { notes: NoteHook[] }) {
  const dispatch = useAppDispatch();
  const handleFilterTags = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    note: NoteHook
  ) => {
    const { id, hidden } = note;
    if (e.currentTarget.id !== id) {
      dispatch(editNote({ ...note, hidden: !hidden }));
    }
  };
  return (
    <div className="tags" style={{ display: 'flex' }}>
      {notes
        .filter((el) => el.tag !== '')
        .map((el) => (
          <button
            type="button"
            key={el.content + el.id}
            style={el.hidden ? { backgroundColor: 'white' } : undefined}
            onClick={(e) => handleFilterTags(e, el)}
          >
            {cutSymbolIfExist(el.tag, '#')}
          </button>
        ))}
    </div>
  );
}

export default Tags;
