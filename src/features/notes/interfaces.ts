export interface HighlightedElement {
  isHighlighted: boolean;
  text: string;
}

export interface NoteTag {
  id: string;
  text: string;
}

export interface Note {
  id: string;
  content: string;
  isEdit: boolean;
  tag: NoteTag;
  hidden?: boolean;
}

export interface NoteHook {
  id?: number;
  content: HighlightedElement[];
  tag: string;
  isEdit: boolean;
  hidden?: boolean;
}
