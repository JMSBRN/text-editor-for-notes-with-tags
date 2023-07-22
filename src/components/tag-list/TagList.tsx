import React from 'react';
import TagListStyled from './TagListStyle.ts';
import { useAppSelector } from '../../hooks/storeHooks.ts';
import { selectNotes } from '../../features/notes/notesSlice.ts';

function TagList() {
  const { notes, tag } = useAppSelector(selectNotes);
  return (
    <TagListStyled>
      <div className="">tag: {tag.text}</div>
      {notes.map((el) => (
        <div key={el.content + el.id}>{el.tag.text}</div>
      ))}
    </TagListStyled>
  );
}

export default TagList;
