export type Note = {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
};

export type FetchNotesParams = {
  search?: string;
  page: number;
  perPage: number;
};

export type FetchNotesResponse = {
  notes: Note[];
  totalPages: number;
};

export type CreateNoteDto = {
  title: string;
  content: string;
  tag?: string;
};

export type NotePageProps = {
  params: {
    id: string;
  };
};

