import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes, deleteNote } from '../../services/noteHubAPI';
import type { FetchNotesParams, FetchNotesResponse } from '../../types/types';
import type { Note } from '../../types/types';

import css from './NoteList.module.css';

interface NoteListProps {
  search: string;
  page: number;
  setPageCount: (selected: number) => void;
}

export default function NoteList({ search, page, setPageCount }: NoteListProps) {
  const queryClient = useQueryClient();

  const params: FetchNotesParams = { search, page, perPage: 12 };

  const { data, isLoading, error } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', params],
    queryFn: () => fetchNotes(params),
    placeholderData: keepPreviousData,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (error) return <p>Error loading notes</p>;

  if (!data || data.notes.length === 0) return <p>No notes found</p>;

  setPageCount(data.totalPages)

  return (
    <ul className={css.list}>
      {data.notes.map((note: Note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.deleteButton}
              onClick={() => deleteMutation.mutate(note.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
