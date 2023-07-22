import React from 'react';
import { useSelector } from 'react-redux';
import {
  deleteNote,
  editNote,
  selectNotes,
  setisEditMode,
} from '../../features/notes/notesSlice.ts';
import { NoteListStyled, NoteStyled } from './NoteListStyle.ts';
import { useAppDispatch } from '../../hooks/storeHooks.ts';
import { Note } from '../../features/notes/interfaces.ts';

function NoteList() {
  const { notes } = useSelector(selectNotes);
  const dispatch = useAppDispatch();

  const handlEditNote = (note: Note) => {
    dispatch(editNote(note));
    dispatch(setisEditMode(note));
  };
  const handleChangeNoteContent = (
    e: React.ChangeEvent<HTMLInputElement>,
    note: Note
  ) => {
    const { value } = e.target;
    const { isEdit } = note;
    if (isEdit) {
      dispatch(editNote({ ...note, content: value }));
    }
  };
  const handleDeleteNote = (note: Note) => {
    const { id } = note;
    dispatch(deleteNote(id));
  };

  return (
    <NoteListStyled>
      {notes.map((el) => (
        <NoteStyled key={el.id}>
          <p>{el.id}</p>
          <br />
          <p>tag: {el.tag.text}</p>
          <p>{el.content}</p>
          {el.isEdit && (
            <input
              type="text"
              value={el.content}
              onChange={(e) => handleChangeNoteContent(e, el)}
            />
          )}
          <button type="button" onClick={() => handlEditNote(el)}>
            {el.isEdit ? 'Save' : 'Edit'}
          </button>
          <button type="button" onClick={() => handleDeleteNote(el)}>
            Delete
          </button>
        </NoteStyled>
      ))}
    </NoteListStyled>
  );
}

export default NoteList;
