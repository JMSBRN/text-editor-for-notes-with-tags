import React from 'react';
import { HighlightedElement } from '../../features/notes/interfaces.ts';
import generateUniqueId from '../../features/notes/utilsForNotes.ts';

export function ContentTextEditMode({
  highlightElements,
}: {
  highlightElements: HighlightedElement[];
}) {
  const uniqId = generateUniqueId();
  return (
    <div>
      {highlightElements.map((el) => (
        <span key={el.text + uniqId}>
          {el.isHighlighted ? (
            <span style={{ backgroundColor: 'yellow' }}>{el.text}</span>
          ) : (
            <span key={el.text + uniqId}>{el.text}</span>
          )}
        </span>
      ))}
    </div>
  );
}
export default ContentTextEditMode;
