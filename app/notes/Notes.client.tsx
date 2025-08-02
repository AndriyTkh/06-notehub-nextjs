'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import debounce from 'lodash.debounce';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';

import { fetchNotes, deleteNote } from '@/lib/api';
import { FetchNotesResponse } from '@/types/FetchNotesResponse';

import styles from './page.module.css';

type NotesClientProps = {
  initialData: FetchNotesResponse;
};

export default function NotesClient({ initialData }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const debouncedSetSearch = useMemo(() => debounce(setSearch, 300), []);

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['notes', { search, page }],
    queryFn: () => fetchNotes({ search, page, perPage: 12 }),
    initialData: page === 1 && search === '' ? initialData : undefined,
    placeholderData: keepPreviousData,
  });

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onMutate: (id: string) => {
      setDeletingId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setDeletingId(null);
    },
    onError: () => {
      setDeletingId(null);
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className={styles.app}>
      <div className={styles.toolbar}>
        <button className={styles.button} onClick={() => setShowModal(true)}>
          + New Note
        </button>
        <Pagination page={page} setPage={setPage} pageCount={data?.totalPages || 1} />
        <SearchBox search={search} onSearchChange={debouncedSetSearch} />
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading notes</p>}

      {data && (
        <NoteList
          notes={data.notes}
          onDelete={handleDelete}
          isDeletingId={deletingId}
        />
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteForm onSuccess={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
}
