import { configureStore } from '@reduxjs/toolkit';
import notesREducer from '../features/notes/notesSlice.ts';

const store = configureStore({
  reducer: {
    notes: notesREducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
