import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';
import { Note, NoteTag } from './interfaces.ts';
import { RootState } from '../../store/store.ts';
import {
  addNoteDb,
  deleteNoteDB,
  fetchItems,
  updateNoteDb,
} from './thunks/NotesDbThunks.ts';

interface InitialNotesState {
  notes: Note[];
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
    setisEditMode: (state, action: PayloadAction<Note>) => {
      const { id, isEdit } = action.payload;
      const note = state.notes.find((n) => n.id === id);
      if (note) {
        note.isEdit = !isEdit;
      }
    },
    editNote: (state, action: PayloadAction<Note>) => {
      const { id, content, tag, hidden } = action.payload;
      const note = state.notes.find((n) => n.id === id);
      if (note) {
        note.content = content;
        note.tag = tag;
        note.hidden = hidden;
      }
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
      })
      .addCase(addNoteDb.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateNoteDb.fulfilled, (state, action) => {
        const { id, updatedItem } = action.payload;
        const index = state.notes.findIndex((note) => note.id === id);
        if (index !== -1) {
          state.notes[index] = updatedItem;
        }
      })
      .addCase(deleteNoteDB.fulfilled, (state, action) => {
        const id = action.payload;
        state.notes = state.notes.filter((note) => note.id !== id);
      });
  },
});

export const { setNotes, setTextTag, setisEditMode, editNote } =
  notesSlice.actions;
export const selectNotes = (state: RootState) => state.notes;
export default notesSlice.reducer;
