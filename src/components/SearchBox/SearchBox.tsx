import { ChangeEvent } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBox({ search, setSearch }: SearchBoxProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={search}
      onChange={handleChange}
    />
  );
}
