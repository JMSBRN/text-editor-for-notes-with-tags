import React from 'react';
import { HighlightedElement } from '../../features/notes/interfaces.ts';
import generateUniqueId from '../../features/notes/utilsForNotes.ts';
import ContentStyled from './ContnetTextStyles.ts';

export function ContentText({
  highlightElements,
}: {
  highlightElements: HighlightedElement[];
}) {
  const uniqId = generateUniqueId();
  return (
    <ContentStyled>
      {highlightElements.map((el) => (
        <span key={el.text + uniqId}>{el.text}</span>
      ))}
    </ContentStyled>
  );
}
export default ContentText;
