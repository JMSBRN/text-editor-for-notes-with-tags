import React from 'react';
import { HighlightedElement } from '../../features/notes/interfaces.ts';

export function ContentText({
  highlightElements,
}: {
  highlightElements: HighlightedElement[];
}) {
  return (
    <div>
      {highlightElements.map((el) => (
        <span key={el.text}>{el.text}</span>
      ))}
    </div>
  );
}
export default ContentText;
