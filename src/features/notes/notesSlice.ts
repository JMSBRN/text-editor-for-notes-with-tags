import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Note, NoteTag } from './interfaces.ts';
import { RootState } from '../../store/store.ts';

interface InitialNotesState {
  notes: Note[];
  tag: NoteTag;
}
const initialState: InitialNotesState = {
  notes: [],
  tag: { id: '', text: '' },
};
const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setTextTag: (state, action: PayloadAction<string>) => {
      const s = state;
      s.tag.text = action.payload;
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    setisEditMode: (state, action: PayloadAction<Note>) => {
      const { id, isEdit } = action.payload;
      const note = state.notes.find((n) => n.id === id);
      if (note) {
        note.isEdit = !isEdit;
      }
    },
    editNote: (state, action: PayloadAction<Note>) => {
      const { id, content } = action.payload;
      const note = state.notes.find((n) => n.id === id);
      if (note) {
        note.content = content;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const s = state;
      s.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const { setTextTag, setisEditMode, addNote, editNote, deleteNote } =
  notesSlice.actions;
export const selectNotes = (state: RootState) => state.notes;
export default notesSlice.reducer;
