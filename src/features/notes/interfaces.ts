export interface HighlightedElement {
  isHighlighted: boolean;
  text: string;
}

export interface NoteTag {
  id: string;
  text: string;
}

export interface Note {
  id?: number;
  content: HighlightedElement[];
  tag: string;
  isEdit: boolean;
  hidden?: boolean;
}
