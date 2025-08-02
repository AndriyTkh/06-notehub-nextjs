import Link from 'next/link';
import css from './NoteList.module.css';

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
};



type NoteListProps = {
  notes: Note[];
  onDelete: (id: string) => void;
  isDeletingId: string | null;
};

export default function NoteList({ notes, onDelete, isDeletingId }: NoteListProps) {
  if (notes.length === 0) return <p>No notes found</p>;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link className={css.linkButton} href={`/notes/${note.id}`}>
              View details
            </Link>
            <button
              className={css.deleteButton}
              onClick={() => onDelete(note.id)}
              disabled={isDeletingId === note.id}
            >
              {isDeletingId === note.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
