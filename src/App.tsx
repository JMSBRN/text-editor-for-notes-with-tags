import React from 'react';
import AppStyle from './styles/AppStyle.ts';
import NoteEdotorHook from './components/note-editor/NoteEditor.tsx';

function App() {
  return (
    <AppStyle>
      <NoteEdotorHook />
    </AppStyle>
  );
}

export default App;
