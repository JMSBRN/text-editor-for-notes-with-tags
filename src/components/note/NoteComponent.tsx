import React, { useEffect, useState } from 'react';
import ContentText from '../content-text/ContentText.tsx';
import ContentTextEditMode from '../content-text/ContentTextEditMode.tsx';
import { Note } from '../../features/notes/interfaces.ts';
import NoteStyled from './NoteStyles.ts';
import {
  checkIfStringContainsHash,
  getSymbolsAfterHashAnStopedAfterPoint,
  setArrayWithUniqItems,
  setHighlightText,
} from '../../features/notes/utilsForNotes.ts';
import { useAppDispatch } from '../../hooks/storeHooks.ts';
import {
  deleteNoteDB,
  updateNoteDb,
} from '../../features/notes/thunks/NotesDbThunks.ts';

function NoteComponent({ note }: { note: Note }) {
  const dispatch = useAppDispatch();
  const [inputText, setInputText] = useState<string>('');
  const { id, isEdit, tag } = note;
  const [currentTag, setCurrentTag] = useState<string>(tag);

  useEffect(() => {
    const f = async () => {
      if (id && isEdit)
        await dispatch(
          updateNoteDb({ id, updatedItem: { ...note, isEdit: false } })
        );
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditNote = async () => {
    if (id)
      await dispatch(
        updateNoteDb({ id, updatedItem: { ...note, isEdit: !isEdit } })
      );
    const arr = note.content.map(({ text }) => text);
    const uniqArr = setArrayWithUniqItems(arr);
    setInputText(uniqArr.join(''));
  };
  const handleDeleteNote = async () => {
    if (id) await dispatch(deleteNoteDB(id));
  };
  const handlleChangeContent = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setInputText(value);
    const symbols = getSymbolsAfterHashAnStopedAfterPoint(value);
    const isHashExisted = checkIfStringContainsHash(inputText);
    symbols.forEach((symbol) => {
      if (isHashExisted) {
        setCurrentTag(symbol);
      }
    });
    const content = setHighlightText(value);
    if (inputText) {
      const updatedItem: Note = { ...note, content, tag: currentTag };
      if (id) await dispatch(updateNoteDb({ id, updatedItem }));
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
            value={inputText}
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

export default NoteComponent;
