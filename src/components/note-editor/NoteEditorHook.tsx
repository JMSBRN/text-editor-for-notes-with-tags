import React, { useEffect, useState } from 'react';
import useHighlightTextAfterHash from '../../hooks/useHighlightTextAfterHash.ts';
import { getSymbolsAfterHashAnStopedAfterPoint } from '../../features/notes/utilsForNotes.ts';
import Tags from '../tag-list/Tags.tsx';
import {
  HighlightedElement,
  NoteHook,
} from '../../features/notes/interfaces.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks.ts';
import { selectNotes } from '../../features/notes/notesSlice.ts';
import Notes from '../note-list/Notes.tsx';
import { addNoteDb } from '../../features/notes/thunks/NotesDbThunks.ts';

function NoteEditorHook() {
  const { handleInputChange, inputText, highlightText } =
    useHighlightTextAfterHash();
  const [inputValue, setInputValue] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [newNote, setNewNote] = useState<NoteHook | null>(null);
  const { notes } = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();
  const [highlightElements, setHighlightElements] = useState<
    HighlightedElement[]
  >([]);
  useEffect(() => {
    setInputValue(inputText);
  }, [inputText]);

  const handleInputvalue = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    const { value } = e.target;
    const symbols = getSymbolsAfterHashAnStopedAfterPoint(value);
    setHighlightElements(highlightText);
    symbols.forEach((symbol) => {
      if (symbol) {
        if (symbol !== '#') {
          setTag(symbol);
        }
      }
    });
  };
  const handleCreateNote = () => {
    if (newNote) dispatch(addNoteDb(newNote));
    setNewNote({
      content: highlightElements,
      tag,
      isEdit: false,
      hidden: false,
    });
    setInputValue('');
    setTag('');
  };

  return (
    <div
      style={{
        margin: '0 auto',
        height: '700px',
      }}
    >
      <div className="tag">{tag}</div>
      <input type="text" value={inputValue} onChange={handleInputvalue} />
      <button type="button" onClick={handleCreateNote}>
        Save note
      </button>
      <div className="tags">
        <Tags notes={notes} />
      </div>
      <Notes />
    </div>
  );
}

export default NoteEditorHook;
