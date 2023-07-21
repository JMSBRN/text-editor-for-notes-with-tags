import React from 'react';
import AppStyle from './styles/AppStyle.ts';
import NoteEditor from './components/note-editor/NoteEditor.tsx';
import NoteList from './components/note-list/NoteList.tsx';
import { Note } from './features/notes/interfaces.ts';

function App() {
  const onEditNote = (note: Note) => {
    // eslint-disable-next-line no-console
    console.log(note);
  };
  return (
    <AppStyle>
      <NoteEditor />
      <NoteList onEditNote={onEditNote} />
    </AppStyle>
  );
}

export default App;
