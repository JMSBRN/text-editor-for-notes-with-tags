import React from 'react';
import { HighlightedElement } from '../../features/notes/interfaces.ts';

export function ContentTextEditMode({
  highlightElements,
}: {
  highlightElements: HighlightedElement[];
}) {
  return (
    <div>
      {highlightElements.map((el) =>
        el.isHighlighted ? (
          <span key={el.text} style={{ backgroundColor: 'yellow' }}>
            {el.text}
          </span>
        ) : (
          <span key={el.text}>{el.text}</span>
        )
      )}
    </div>
  );
}
export default ContentTextEditMode;
