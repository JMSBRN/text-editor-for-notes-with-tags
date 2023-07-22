export interface NoteTag {
  id: string;
  text: string;
}

export interface Note {
  id: string;
  content: string;
  isEdit: boolean;
  tag: NoteTag;
}
