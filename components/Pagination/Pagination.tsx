import styles from './Pagination.module.css';

type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  pageCount: number;
};

export default function Pagination({ page, setPage, pageCount }: PaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= pageCount) {
      setPage(newPage);
    }
  };

  return (
    <ul className={styles.pagination}>
      {/* Prev Arrow */}
      <li onClick={() => goToPage(page - 1)} className={page === 1 ? styles.disabled : ''}>
        <a>&larr;</a>
      </li>

      {/* Page Numbers */}
      {pages.map((p) => (
        <li
          key={p}
          className={p === page ? styles.active : ''}
          onClick={() => goToPage(p)}
        >
          <a>{p}</a>
        </li>
      ))}

      {/* Next Arrow */}
      <li onClick={() => goToPage(page + 1)} className={page === pageCount ? styles.disabled : ''}>
        <a>&rarr;</a>
      </li>
    </ul>
  );
}
