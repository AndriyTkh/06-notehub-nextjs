'use client';

import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  pageCount: number;
};

export default function Pagination({ page, setPage, pageCount }: PaginationProps) {
  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="→"
      onPageChange={handlePageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      forcePage={page - 1} // convert to 0-based
      previousLabel="←"
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      disabledClassName={styles.disabled}
      pageClassName={styles.page}
      previousClassName={styles.prev}
      nextClassName={styles.next}
      breakClassName={styles.break}
    />
  );
}
