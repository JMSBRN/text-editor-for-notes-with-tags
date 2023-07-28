import React from 'react';
import TagStyled from './TagStyles.ts';
import { Note } from '../../features/notes/interfaces.ts';

interface TagStyledProps {
  note: Note;
  tagText: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
function Tag({ note, tagText, onClick }: TagStyledProps) {
  return (
    <TagStyled
      hidden={note.hidden ? 0.3 : 1}
      label={tagText}
      onClick={onClick}
    />
  );
}

export default Tag;
