import React, { useEffect, useState } from 'react';
import ContentText from '../content-text/ContentText.tsx';
import ContentTextEditMode from '../content-text/ContentTextEditMode.tsx';
import { NoteHook } from '../../features/notes/interfaces.ts';
import NoteStyled from './NoteStyles.ts';
import {
  editNote,
  setisEditMode,
  deleteNote,
} from '../../features/notes/notesSlice.ts';
import {
  getSymbolsAfterHashAnStopedAfterPoint,
  setArrayWithUniqItems,
} from '../../features/notes/utilsForNotes.ts';
import { useAppDispatch } from '../../hooks/storeHooks.ts';
import useHighlightTextAfterHash from '../../hooks/useHighlightTextAfterHash.ts';

function Note({ note }: { note: NoteHook }) {
  const { handleInputChange, inputText, highlightText } =
    useHighlightTextAfterHash();
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>('');
  const [tag, setTag] = useState<string>('');

  useEffect(() => {
    setInputValue(inputText);
  }, [inputText]);

  const handleEditNote = (el: NoteHook) => {
    dispatch(editNote(el));
    dispatch(setisEditMode(el));
    const arr = el.content.map(({ text }) => text);
    const uniqArr = setArrayWithUniqItems(arr);
    setInputValue(uniqArr.join(''));
  };
  const handleDeleteNote = (el: NoteHook) => {
    const { id } = el;
    dispatch(deleteNote(id));
  };
  const handlleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    const { value } = e.target;
    const symbols = getSymbolsAfterHashAnStopedAfterPoint(value);
    symbols.forEach((symbol) => {
      if (symbol) {
        if (symbol !== '#') {
          setTag(symbol);
        }
      }
    });
    const content = highlightText;
    if (content.length) {
      dispatch(editNote({ ...note, content, tag }));
    }
  };
  return (
    <NoteStyled key={note.id}>
      <div className="id" style={{ fontSize: '10px' }}>
        {!note.isEdit && <ContentText highlightElements={note.content} />}
      </div>
      {note.isEdit && (
        <div>
          <ContentTextEditMode highlightElements={note.content} />
          <input
            style={{ width: '330px' }}
            type="text"
            value={inputValue}
            onChange={(e) => handlleChangeContent(e)}
          />
        </div>
      )}
      <div className="btns">
        <button type="button" onClick={() => handleEditNote(note)}>
          {note.isEdit ? 'Save' : 'Edit'}
        </button>
        <button type="button" onClick={() => handleDeleteNote(note)}>
          Delete
        </button>
      </div>
    </NoteStyled>
  );
}

export default Note;
