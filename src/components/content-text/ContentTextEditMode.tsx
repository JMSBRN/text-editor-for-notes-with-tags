import React from 'react';
import { HighlightedElement } from '../../features/notes/interfaces.ts';
import generateUniqueId from '../../features/notes/utilsForNotes.ts';
import ContentTextStyledForEditMode from './ContentTextStyledForEditMode.ts';

export function ContentTextEditMode({
  highlightElements,
}: {
  highlightElements: HighlightedElement[];
}) {
  const uniqId = generateUniqueId();
  return (
    <ContentTextStyledForEditMode>
      {highlightElements.map((el) => (
        <span key={el.text + uniqId}>
          <span>
            {el.isHighlighted ? (
              <span style={{ backgroundColor: 'yellow' }}>{el.text}</span>
            ) : (
              <span>{el.text}</span>
            )}
          </span>
        </span>
      ))}
    </ContentTextStyledForEditMode>
  );
}
export default ContentTextEditMode;
