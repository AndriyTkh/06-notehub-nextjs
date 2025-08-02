import { Note } from "./Note";

export type FetchNotesResponse = {
  notes: Note[];
  totalPages: number;
};