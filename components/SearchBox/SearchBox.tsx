import css from './SearchBox.module.css';

interface SearchBoxProps {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function SearchBox({ search, onSearchChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}
