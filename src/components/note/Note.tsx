import React, { useEffect, useState } from 'react';
import ContentText from '../content-text/ContentText.tsx';
import ContentTextEditMode from '../content-text/ContentTextEditMode.tsx';
import { NoteHook } from '../../features/notes/interfaces.ts';
import NoteStyled from './NoteStyles.ts';
import { setisEditMode } from '../../features/notes/notesSlice.ts';
import {
  getSymbolsAfterHashAnStopedAfterPoint,
  setArrayWithUniqItems,
} from '../../features/notes/utilsForNotes.ts';
import { useAppDispatch } from '../../hooks/storeHooks.ts';
import useHighlightTextAfterHash from '../../hooks/useHighlightTextAfterHash.ts';
import {
  deleteNoteDB,
  updateNoteDb,
} from '../../features/notes/thunks/NotesDbThunks.ts';

function Note({ note }: { note: NoteHook }) {
  const { handleInputChange, inputText, highlightText } =
    useHighlightTextAfterHash();
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>('');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [tag, setTag] = useState<string>('');
  const { id } = note;

  useEffect(() => {
    setInputValue(inputText);
  }, [inputText]);

  const handleEditNote = () => {
    setIsEditMode(!isEditMode);
    if (id)
      dispatch(
        updateNoteDb({ id, updatedItem: { ...note, isEdit: isEditMode } })
      );
    dispatch(setisEditMode(note));
    const arr = note.content.map(({ text }) => text);
    const uniqArr = setArrayWithUniqItems(arr);
    setInputValue(uniqArr.join(''));
  };
  const handleDeleteNote = () => {
    if (id) dispatch(deleteNoteDB(id));
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
      const updatedItem: NoteHook = { ...note, content, tag };
      if (id) dispatch(updateNoteDb({ id, updatedItem }));
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
        <button type="button" onClick={handleEditNote}>
          {note.isEdit ? 'Save' : 'Edit'}
        </button>
        <button type="button" onClick={handleDeleteNote}>
          Delete
        </button>
      </div>
    </NoteStyled>
  );
}

export default Note;
