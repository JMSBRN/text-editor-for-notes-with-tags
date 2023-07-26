import { createAsyncThunk } from '@reduxjs/toolkit';
import db from '../../../indexed-db/indexedDB.ts';
import { NoteHook } from '../interfaces.ts';

export const fetchItems = createAsyncThunk<NoteHook[]>(
  'notes/fetchItems',
  async () => {
    try {
      const items: NoteHook[] = await db.items.toArray();
      return items;
    } catch (error) {
      throw new Error(`Error fetching items from IndexedDB: ${error}`);
    }
  }
);

export default fetchItems;
