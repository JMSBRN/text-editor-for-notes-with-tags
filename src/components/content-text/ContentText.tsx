import React from 'react';
import { HighlightedElement } from '../../features/notes/interfaces.ts';
import generateUniqueId from '../../features/notes/utilsForNotes.ts';

export function ContentText({
  highlightElements,
}: {
  highlightElements: HighlightedElement[];
}) {
  const uniqId = generateUniqueId();
  return (
    <div>
      {highlightElements.map((el) => (
        <span key={el.text + uniqId}>{el.text}</span>
      ))}
    </div>
  );
}
export default ContentText;
