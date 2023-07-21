import React, { useState } from 'react';
import NoteEditorStyled from './NoteEditoreStyle.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks.ts';
import {
  addNote,
  selectNotes,
  setTag,
  setTags,
} from '../../features/notes/notesSlice.ts';
import generateUniqueId, {
  checkValueWithRegex,
} from '../../features/notes/utilsForNotes.ts';

function NoteEditor() {
  const [content, setContent] = useState<string>('');
  const dispatch = useAppDispatch();
  const { tag } = useAppSelector(selectNotes);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setContent(value);
    const isTag = checkValueWithRegex(value, /#(\w+)/g);
    if (isTag) {
      dispatch(setTag(value.slice(1)));
    }
  };
  const handleSveNote = () => {
    if (content) {
      const uniqId = generateUniqueId();
      dispatch(addNote({ id: uniqId, content, isEdit: false }));
      setContent('');
      dispatch(setTags(tag));
      dispatch(setTag(''));
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
