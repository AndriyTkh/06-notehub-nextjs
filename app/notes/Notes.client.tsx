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
}

export default function NotesClient({ initialData }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const debouncedUpdate = useMemo(
    () => debounce((value: string) => setDebouncedSearch(value), 300),
    []
  );

  useEffect(() => {
    debouncedUpdate(searchText);
    return () => debouncedUpdate.cancel();
  }, [searchText, debouncedUpdate]);

  useEffect(() => {
    setPage(1);
  }, [searchText]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', { search: debouncedSearch, page }],
    queryFn: () => fetchNotes({ search: debouncedSearch, page, perPage: 12 }),
    initialData: page === 1 && debouncedSearch === '' ? initialData : undefined,
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => setSearchText(value);
  const handlePageChange = (newPage: number) => setPage(newPage);

  return (
    <div className={styles.app}>
      <div className={styles.toolbar}>
        <button className={styles.button} onClick={() => setShowModal(true)}>
          + New Note
        </button>
        <SearchBox onSearchChange={handleSearchChange} />
        {data?.totalPages != undefined && data.totalPages > 1 && (
          <Pagination currentPage={page} totalPages={data.totalPages} onPageChange={handlePageChange} />
        )}
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading notes</p>}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {data && data.notes.length === 0 && <p>No notes found.</p>}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteForm onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
}
