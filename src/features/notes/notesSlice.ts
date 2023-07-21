import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Note } from './interfaces.ts';
import { RootState } from '../../store/store.ts';

interface InitialNotesState {
  notes: Note[];
  tags: string[];
  tag: string;
}
const initialState: InitialNotesState = {
  notes: [],
  tags: [],
  tag: '',
};
const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setTag: (state, action: PayloadAction<string>) => {
      const s = state;
      s.tag = action.payload;
    },
    setTags: (state, action: PayloadAction<string>) => {
      const s = state;
      s.tags = [...s.tags, action.payload];
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

export const { setTag, setTags, setisEditMode, addNote, editNote, deleteNote } =
  notesSlice.actions;
export const selectNotes = (state: RootState) => state.notes;
export default notesSlice.reducer;
