import React from 'react';
import AppStyle from './styles/AppStyle.ts';
import NoteEditor from './components/note-editor/NoteEditor.tsx';
import NoteList from './components/note-list/NoteList.tsx';
import TagList from './components/tag-list/TagList.tsx';

function App() {
  return (
    <AppStyle>
      <NoteEditor />
      <TagList />
      <NoteList />
    </AppStyle>
  );
}

export default App;
