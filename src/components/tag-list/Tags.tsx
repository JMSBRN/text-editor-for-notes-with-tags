import React from 'react';
import { Note } from '../../features/notes/interfaces.ts';
import { useAppDispatch } from '../../hooks/storeHooks.ts';
import { updateNoteDb } from '../../features/notes/thunks/NotesDbThunks.ts';
import Tag from '../tag/Tag.tsx';

function Tags({ notes }: { notes: Note[] }) {
  const dispatch = useAppDispatch();
  const handleFilterTags = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    note: Note
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
          <Tag
            key={el.id}
            note={el}
            tagText={el.tag}
            onClick={(e) => handleFilterTags(e, el)}
          />
        ))}
    </div>
  );
}

export default Tags;
