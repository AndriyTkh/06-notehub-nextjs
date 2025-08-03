import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearchChange: (value: string) => void;
};

export default function SearchBox({ onSearchChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search..."
      value={""}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}
