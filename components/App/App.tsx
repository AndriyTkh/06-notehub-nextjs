import { useState, useEffect } from 'react';
import { authenticate } from '../../lib/api/authService';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteForm from '../NoteForm/NoteForm';
import Modal from '../Modal/Modal';
import styles from './App.module.css';

export default function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [authLoading, setAuthLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const email = 'your.email@example.com';

  useEffect(() => {
    async function initAuth() {
      try {
        await authenticate(email);
      } catch (error) {
        console.error('Authentication failed:', error);
      } finally {
        setAuthLoading(false);
      }
    }
    initAuth();
  }, []);

  if (authLoading) return <p>Authenticating...</p>;

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
