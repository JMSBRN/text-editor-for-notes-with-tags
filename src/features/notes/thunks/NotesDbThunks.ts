import { createAsyncThunk } from '@reduxjs/toolkit';
import db from '../../../indexed-db/indexedDB.ts';
import { Note } from '../interfaces.ts';

export const fetchItems = createAsyncThunk<Note[]>(
  'notes/fetchItems',
  async () => {
    try {
      const items: Note[] = await db.items.toArray();
      return items;
    } catch (error) {
      throw new Error(`Error fetching items from IndexedDB: ${error}`);
    }
  }
);

export const addNoteDb = createAsyncThunk(
  'items/addItem',
  async (item: Note) => {
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
  updatedItem: Note;
}
export const updateNoteDb = createAsyncThunk<
  UpdateItemPayload,
  { id: number; updatedItem: Note }
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
