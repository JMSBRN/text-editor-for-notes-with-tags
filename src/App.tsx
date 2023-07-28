import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import AppStyle from './styles/AppStyle.ts';
import NoteEditorHook from './components/note-editor/NoteEditor.tsx';

function App() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 5 }}>
        <AppStyle>
          <Typography
            variant="h5"
            component="h1"
            sx={{ m: '0 20px', mb: '40px' }}
          >
            Welcome to Note Editor with Tags, the app for easy note
            organization. Create, edit, delete, and tag notes for fast access.
            Write reminders, lists, recipes, journals, and more. Enjoy the
            simple and convenient app today.
          </Typography>
          <NoteEditorHook />
          <Typography>
            Tag will create after symbol &quot;#&quot; and stop created with
            &quot;.&quot; and &quot; &quot;. For example, #shopping. or #work.
            You can use multiple tags for one note, such as #recipe #dinner. To
            see all your notes with a specific tag, just tap on the tag name.
            You can also edit or delete tags by long-pressing on them.
          </Typography>
        </AppStyle>
      </Box>
    </Container>
  );
}

export default App;
