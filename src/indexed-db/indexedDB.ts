import Dexie from 'dexie';
import { NoteHook } from '../features/notes/interfaces.ts';

class MyDatabase extends Dexie {
  items: Dexie.Table<NoteHook, number>;

  constructor() {
    super('notes');
    this.version(1).stores({
      items: '++id,tag,isEdit,hidden',
    });
    this.items = this.table('items');
  }
}

const db = new MyDatabase();
export default db;
