import React from 'react';
import generateUniqueId, {
  cutSymbolIfExist,
} from '../../features/notes/utilsForNotes.ts';
import { NoteHook } from '../../features/notes/interfaces.ts';
import { useAppDispatch } from '../../hooks/storeHooks.ts';
import { updateNoteDb } from '../../features/notes/thunks/NotesDbThunks.ts';

function Tags({ notes }: { notes: NoteHook[] }) {
  const dispatch = useAppDispatch();
  const uniqId = generateUniqueId();
  const handleFilterTags = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    note: NoteHook
  ) => {
    const currentId = Number(e.currentTarget.id);

    const { id, hidden } = note;
    if (currentId !== id) {
      const updatedItem = { ...note, hidden: !hidden };
      if (id) await dispatch(updateNoteDb({ id, updatedItem }));
    }
  };
  return (
    <div className="tags" style={{ display: 'flex' }}>
      {notes
        .filter((el) => el.tag !== '')
        .map((el) => (
          <button
            type="button"
            key={el.content + uniqId}
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
