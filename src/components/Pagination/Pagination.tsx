import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  setPage: (selected: number) => void;
  pageCount: number;
}

export default function Pagination({ page, setPage, pageCount }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={page - 1}
      onPageChange={(selectedItem) => setPage(selectedItem.selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel={'←'}
      nextLabel={'→'}
      breakLabel={'...'}
    />
  );
}
