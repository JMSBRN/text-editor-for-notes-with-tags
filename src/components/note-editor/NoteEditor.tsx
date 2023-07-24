import React, { useState } from 'react';
import NoteEditorStyled from './NoteEditoreStyle.ts';
import { useAppDispatch } from '../../hooks/storeHooks.ts';
import { addNote, setTextTag } from '../../features/notes/notesSlice.ts';
import generateUniqueId, {
  cutSymbolIfExist,
  setTextForTag,
} from '../../features/notes/utilsForNotes.ts';

function NoteEditor() {
  const [content, setContent] = useState<string>('');
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const textForTag = setTextForTag(value);
    dispatch(setTextTag(textForTag));
    setContent(value);
  };
  const handleSveNote = () => {
    if (content) {
      const uniqId = generateUniqueId();
      const text = setTextForTag(content);
      const contentWithoutHash = cutSymbolIfExist(content, '#');
      dispatch(
        addNote({
          id: uniqId,
          content: contentWithoutHash,
          isEdit: false,
          tag: { id: uniqId, text },
        })
      );
      setContent('');
      dispatch(setTextTag(''));
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
