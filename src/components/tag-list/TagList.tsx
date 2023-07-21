import React from 'react';
import TagListStyled from './TagListStyle.ts';
import { useAppSelector } from '../../hooks/storeHooks.ts';
import { selectNotes } from '../../features/notes/notesSlice.ts';

function TagList() {
  const { tag, tags } = useAppSelector(selectNotes);
  return (
    <TagListStyled>
      {tag}
      {tags.map((el) => (
        <div>{el}</div>
      ))}
    </TagListStyled>
  );
}

export default TagList;
