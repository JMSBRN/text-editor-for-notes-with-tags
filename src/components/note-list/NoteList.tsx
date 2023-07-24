import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  deleteNote,
  editNote,
  selectNotes,
  setisEditMode,
} from '../../features/notes/notesSlice.ts';
import {
  NoteListStyled,
  NoteStyled,
  ContentStyled,
  ButtonsContainer,
} from './NoteListStyle.ts';
import { useAppDispatch } from '../../hooks/storeHooks.ts';
import { Note } from '../../features/notes/interfaces.ts';
import {
  checkHash,
  cutSymbolIfExist,
} from '../../features/notes/utilsForNotes.ts';

function NoteList() {
  const { notes } = useSelector(selectNotes);
  const dispatch = useAppDispatch();
  const [isTagMode, setIsTagMode] = useState<boolean>(false);

  const handlEditNote = (note: Note) => {
    dispatch(editNote(note));
    dispatch(setisEditMode(note));
    setIsTagMode(false);
  };
  const handleChangeNoteContent = (
    e: React.ChangeEvent<HTMLInputElement>,
    note: Note
  ) => {
    const { value } = e.target;
    const { isEdit } = note;
    if (isEdit) {
      const content = cutSymbolIfExist(value, '#');
      dispatch(editNote({ ...note, content }));
      const isHashExist = checkHash(value);
      if (isHashExist) {
        setIsTagMode(true);
      }
    }
  };
  const handleDeleteNote = (note: Note) => {
    const { id } = note;
    dispatch(deleteNote(id));
  };

  const handleChangeNoteTagTex = (
    e: React.ChangeEvent<HTMLInputElement>,
    note: Note
  ) => {
    const { value } = e.target;
    const { tag } = note;
    const { id } = tag;
    const text = cutSymbolIfExist(value, '#');
    dispatch(editNote({ ...note, tag: { id, text } }));
    if (!value) {
      setIsTagMode(false);
    }
  };

  return (
    <NoteListStyled>
      {notes.map((el) => (
        <div key={el.id}>
          {!el.hidden && (
            <NoteStyled>
              <ContentStyled>
                {el.content}
                <span
                  style={
                    el.isEdit
                      ? {
                          backgroundColor: 'yellow',
                          padding: '0 3px',
                        }
                      : undefined
                  }
                >
                  {el.tag.text}
                </span>
              </ContentStyled>
              {el.isEdit &&
                (isTagMode ? (
                  <input
                    type="text"
                    value={el.tag.text}
                    onChange={(e) => handleChangeNoteTagTex(e, el)}
                  />
                ) : (
                  <input
                    type="text"
                    value={el.content}
                    onChange={(e) => handleChangeNoteContent(e, el)}
                  />
                ))}
              <ButtonsContainer>
                <button type="button" onClick={() => handlEditNote(el)}>
                  {el.isEdit ? 'Save' : 'Edit'}
                </button>
                <button type="button" onClick={() => handleDeleteNote(el)}>
                  Delete
                </button>
              </ButtonsContainer>
            </NoteStyled>
          )}
        </div>
      ))}
    </NoteListStyled>
  );
}

export default NoteList;
