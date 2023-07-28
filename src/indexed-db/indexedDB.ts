import Dexie from 'dexie';
import { Note } from '../features/notes/interfaces.ts';

class MyDatabase extends Dexie {
  items: Dexie.Table<Note, number>;

  constructor() {
    super('MyDatabase');
    this.version(1).stores({
      items: '++id,tag,isEdit,hidden',
    });

    this.items = this.table('items');
  }
}

const db = new MyDatabase();

// async function setupDatabase() {
//   const itemsCount = await db.items.count();
//   if (itemsCount === 0) {
//     const defaultItem: Note = {
//       id: 0,
//       content: [],
//       tag: 'default',
//       isEdit: false,
//     };

//     await db.items.add(defaultItem);
//   }
// }

// setupDatabase();

export const dbReady = db.open();

export default db;
