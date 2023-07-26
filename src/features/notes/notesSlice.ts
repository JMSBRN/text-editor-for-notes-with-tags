import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';
import { NoteHook, NoteTag } from './interfaces.ts';
import { RootState } from '../../store/store.ts';
import fetchItems from './thunks/NotesDbThunks.ts';

interface InitialNotesState {
  notes: NoteHook[];
  tag: NoteTag;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: SerializedError | null;
}
const initialState: InitialNotesState = {
  notes: [],
  tag: { id: '', text: '' },
  status: 'idle',
  error: null,
};
const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setTextTag: (state, action: PayloadAction<string>) => {
      state.tag.text = action.payload;
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
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
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
