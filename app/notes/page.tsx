import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { FetchNotesResponse } from '@/types/FetchNotesResponse';

export default async function NotesPage() {
  const initialData: FetchNotesResponse = await fetchNotes({ page: 1, search: '', perPage: 12 });

  return <NotesClient initialData={initialData} />;
}
