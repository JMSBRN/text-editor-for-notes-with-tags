import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NoteHook, NoteTag } from './interfaces.ts';
import { RootState } from '../../store/store.ts';

interface InitialNotesState {
  notes: NoteHook[];
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
    setNotes: (state, action) => {
      const s = state;
      s.notes = action.payload;
    },
    setTextTag: (state, action: PayloadAction<string>) => {
      const s = state;
      s.tag.text = action.payload;
    },
    addNote: (state, action: PayloadAction<NoteHook>) => {
      state.notes.push(action.payload);
    },
    setisEditMode: (state, action: PayloadAction<NoteHook>) => {
      const { id, isEdit } = action.payload;
      const note = state.notes.find((n) => n.id === id);
      if (note) {
        note.isEdit = !isEdit;
      }
    },
    editNote: (state, action: PayloadAction<NoteHook>) => {
      const { id, content, tag, hidden } = action.payload;
      const note = state.notes.find((n) => n.id === id);
      if (note) {
        note.content = content;
        note.tag = tag;
        note.hidden = hidden;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const s = state;
      s.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const {
  setNotes,
  setTextTag,
  setisEditMode,
  addNote,
  editNote,
  deleteNote,
} = notesSlice.actions;
export const selectNotes = (state: RootState) => state.notes;
export default notesSlice.reducer;
