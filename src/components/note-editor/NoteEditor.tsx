import React, { useEffect, useState } from 'react';
import useHighlightTextAfterHash from '../../hooks/useHighlightTextAfterHash.ts';
import { getSymbolsAfterHashAnStopedAfterPoint } from '../../features/notes/utilsForNotes.ts';
import Tags from '../tag-list/Tags.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks.ts';
import { selectNotes } from '../../features/notes/notesSlice.ts';
import Notes from '../note-list/Notes.tsx';
import { addNoteDb } from '../../features/notes/thunks/NotesDbThunks.ts';
import InputForm from '../input-form/InputForm.tsx';

function NoteEditor() {
  const { handleInputChange, inputText, highlightText } =
    useHighlightTextAfterHash();
  const [inputValue, setInputValue] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const { notes } = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setInputValue(inputText);
  }, [inputText]);

  const handleInputvalue = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    const { value } = e.target;
    const symbols = getSymbolsAfterHashAnStopedAfterPoint(value);
    symbols.forEach((symbol) => {
      if (symbol) {
        if (symbol !== '#') {
          setTag(symbol);
        }
      }
    });
  };
  const handleCreateNote = async () => {
    if (inputValue) {
      await dispatch(
        addNoteDb({
          content: highlightText,
          tag,
          isEdit: false,
          hidden: false,
        })
      );
    }
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
      <InputForm
        onChange={handleInputvalue}
        onClick={handleCreateNote}
        inputValue={inputValue}
      />
      <div className="tags">
        <Tags notes={notes} />
      </div>
      <Notes />
    </div>
  );
}

export default NoteEditor;
