import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Note } from './interfaces.ts';
import { RootState } from '../../store/store.ts';

interface InitialNotesState {
  notes: Note[];
}
const initialState: InitialNotesState = {
  notes: [
    {
      id: '1',
      content: 'content one ',
    },
  ],
};
const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
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

export const { addNote, editNote, deleteNote } = notesSlice.actions;
export const selectNotes = (state: RootState) => state.notes;
export default notesSlice.reducer;
