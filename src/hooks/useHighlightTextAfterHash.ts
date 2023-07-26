import { useState } from 'react';
import { setHighlightText } from '../features/notes/utilsForNotes.ts';

const useHighlightTextAfterHash = () => {
  const [inputText, setInputText] = useState('');
  const highlightText = setHighlightText(inputText);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return { inputText, handleInputChange, highlightText };
};

export default useHighlightTextAfterHash;
