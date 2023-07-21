import { configureStore } from '@reduxjs/toolkit';
import notesREducer from '../features/notes/notesSlice.ts';

const store = configureStore({
  reducer: {
    notes: notesREducer,
  },
});

export default store;
