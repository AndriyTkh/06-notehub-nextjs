'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import debounce from 'lodash.debounce';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';

import { fetchNotes } from '@/lib/api';
import { FetchNotesResponse } from '@/types/FetchNotesResponse';

import styles from './page.module.css';

interface NotesClientProps {
  initialData: FetchNotesResponse;
};

export default function NotesClient({ initialData }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce only for fetching
  const debouncedUpdate = useMemo(
    () => debounce((value: string) => setDebouncedSearch(value), 300),
    []
  );

  useEffect(() => {
    debouncedUpdate(searchText);
    return () => debouncedUpdate.cancel();
  }, [searchText, debouncedUpdate]);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [searchText]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', { search: debouncedSearch, page }],
    queryFn: () => fetchNotes({ search: debouncedSearch, page, perPage: 12 }),
    initialData: page === 1 && debouncedSearch === '' ? initialData : undefined,
    placeholderData: keepPreviousData,
  });

  return (
    <div className={styles.app}>
      <div className={styles.toolbar}>
        <button className={styles.button} onClick={() => setShowModal(true)}>
          + New Note
        </button>
        {data?.totalPages != undefined && data.totalPages > 1 && (
          <Pagination page={page} setPage={setPage} pageCount={data.totalPages} />
        )}
        <SearchBox search={searchText} onSearchChange={setSearchText} />
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading notes</p>}

      {data && data.notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        data && <NoteList notes={data.notes} />
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteForm
            onSuccess={() => setShowModal(false)}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}
