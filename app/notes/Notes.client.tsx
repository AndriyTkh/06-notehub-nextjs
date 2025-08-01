'use client';

import { useState } from 'react';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';
import styles from './page.module.css';

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.app}>
      <div className={styles.toolbar}>
        <button className={styles.button} onClick={() => setShowModal(true)}>
          + New Note
        </button>
        <Pagination page={page} setPage={setPage} pageCount={pageCount} />
        <SearchBox search={search} setSearch={setSearch} />
      </div>

      <NoteList search={search} page={page} setPageCount={setPageCount} />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteForm onSuccess={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
}
