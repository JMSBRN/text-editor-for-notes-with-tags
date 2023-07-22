import React, { useState } from 'react';
import NoteEditorStyled from './NoteEditoreStyle.ts';
import { useAppDispatch } from '../../hooks/storeHooks.ts';
import { addNote, setTextTag } from '../../features/notes/notesSlice.ts';
import generateUniqueId, {
  checkValueWithRegex,
  cutSymbolIfExist,
} from '../../features/notes/utilsForNotes.ts';
import { Regex } from '../../constants.ts';

function NoteEditor() {
  const [content, setContent] = useState<string>('');
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setContent(value);
    const cutContent = cutSymbolIfExist(content, '#');
    const isTagMode = checkValueWithRegex(content, Regex.TAG);
    if (isTagMode) {
      dispatch(setTextTag(cutContent));
    }
  };
  const handleSveNote = () => {
    if (content) {
      const uniqId = generateUniqueId();
      const cutContent = cutSymbolIfExist(content, '#');
      const isTagMode = checkValueWithRegex(content, Regex.TAG);
      dispatch(
        addNote({
          id: uniqId,
          content: cutContent,
          isEdit: false,
          tag: { id: uniqId, text: isTagMode ? cutContent : '' },
        })
      );
      setContent('');
    }
  };
  return (
    <NoteEditorStyled>
      <input type="text" value={content} onChange={handleChange} />
      <button type="button" onClick={handleSveNote}>
        Save note
      </button>
    </NoteEditorStyled>
  );
}

export default NoteEditor;
