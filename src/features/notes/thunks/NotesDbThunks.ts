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

export const addNoteDb = createAsyncThunk(
  'items/addItem',
  async (item: NoteHook) => {
    try {
      const newItem = item;
      const id = await db.items.add(newItem);
      return { id, ...newItem };
    } catch (error) {
      throw new Error(`Error adding item to IndexedDB: ${error}`);
    }
  }
);
interface UpdateItemPayload {
  id: number;
  updatedItem: NoteHook;
}
export const updateNoteDb = createAsyncThunk<
  UpdateItemPayload,
  { id: number; updatedItem: NoteHook }
>('items/updateItem', async ({ id, updatedItem }) => {
  try {
    await db.items.update(id, updatedItem);
    return { id, updatedItem };
  } catch (error) {
    throw new Error(`Error updating item in IndexedDB: ${error}`);
  }
});

export const deleteNoteDB = createAsyncThunk<number, number>(
  'items/deleteItem',
  async (id) => {
    try {
      await db.items.delete(id);
      return id;
    } catch (error) {
      throw new Error(`Error deleting item from IndexedDB: ${error}`);
    }
  }
);
