import { createSlice } from '@reduxjs/toolkit';
import { Note } from './interfaces.ts';

interface InitialNotesState {
  notes: Note[];
}
const initialState: InitialNotesState = {
  notes: [],
};
const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      const s = state;
      s.notes = action.payload;
    },
  },
});

export const { addNote } = notesSlice.actions;
export default notesSlice.reducer;
