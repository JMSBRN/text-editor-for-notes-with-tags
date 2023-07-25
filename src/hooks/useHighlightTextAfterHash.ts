import { useState } from 'react';
import { HighlightedElement } from '../features/notes/interfaces.ts';

const useHighlightTextAfterHash = () => {
  const [inputText, setInputText] = useState('');

  const highlightText = (): HighlightedElement[] => {
    const regex = /#[^.]*\./g;
    const highlightedElements: HighlightedElement[] = [];

    let remainingText = inputText;
    let match;
    // eslint-disable-next-line no-cond-assign
    while ((match = regex.exec(inputText)) !== null) {
      const matchIndex = match.index;
      const matchText = match[0];

      const textBeforeHash = remainingText.substring(0, matchIndex);
      const textAfterHashAndDot = matchText;
      remainingText = remainingText.substring(matchIndex + matchText.length);

      highlightedElements.push({ isHighlighted: false, text: textBeforeHash });
      highlightedElements.push({
        isHighlighted: true,
        text: textAfterHashAndDot,
      });
    }

    if (remainingText.length > 0) {
      highlightedElements.push({ isHighlighted: false, text: remainingText });
    }

    return highlightedElements;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return { inputText, handleInputChange, highlightText };
};

export default useHighlightTextAfterHash;
