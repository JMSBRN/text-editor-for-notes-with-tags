import React from 'react';
import TagListStyled from './TagListStyle.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks.ts';
import { editNote, selectNotes } from '../../features/notes/notesSlice.ts';
import type { Note } from '../../features/notes/interfaces.ts';

function TagList() {
  const { notes, tag } = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();

  const handleFilterTags = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    note: Note
  ) => {
    const { id, hidden } = note;
    if (e.currentTarget.id === id) {
      dispatch(editNote({ ...note, hidden: !hidden }));
    }
  };

  return (
    <TagListStyled>
      {tag.text && <div className="">{tag.text}</div>}
      {notes.map((el) => (
        <button
          type="button"
          id={el.id}
          style={el.hidden ? { backgroundColor: 'white' } : undefined}
          key={el.content + el.id}
          onClick={(e) => handleFilterTags(e, el)}
        >
          {el.tag.text}
        </button>
      ))}
    </TagListStyled>
  );
}

export default TagList;
