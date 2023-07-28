import React, { useEffect, useState } from 'react';
import ContentText from '../content-text/ContentText.tsx';
import ContentTextEditMode from '../content-text/ContentTextEditMode.tsx';
import { Note } from '../../features/notes/interfaces.ts';
import {
  NoteStyled,
  ButtonsContainer,
  ContentContainer,
} from './NoteStyles.ts';
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
import Button from '../button/Button.tsx';
import ButtonWithPromise from '../button/ButtonWithPromise.tsx';
import InputWithPromise from '../input/InputWithPromise.tsx';

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
    <NoteStyled key={note.id} elevation={13}>
      <ContentContainer>
        {note.isEdit ? (
          <div>
            <ContentTextEditMode highlightElements={note.content} />
            <InputWithPromise
              value={inputText}
              onChange={(e) => handlleChangeContent(e)}
            />
          </div>
        ) : (
          <ContentText highlightElements={note.content} />
        )}
      </ContentContainer>

      <ButtonsContainer>
        <Button
          textButton={note.isEdit ? 'Save' : 'Edit'}
          onClick={handleEditNote}
        />
        <ButtonWithPromise
          textButton="Delete"
          onClickPromise={handleDeleteNote}
        />
      </ButtonsContainer>
    </NoteStyled>
  );
}

export default NoteComponent;
