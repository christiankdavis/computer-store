import "./FilterBar.css";

export interface FilterBarProps {
  options: string[];
  selectedFilter: string;
  onChange: (filter: string) => void;
}

export const FilterBar = ({
  options,
  selectedFilter,
  onChange,
}: FilterBarProps) => {
  return (
    <div className="filter-bar">
      <div className="filter-bar__options">
        {options.map((option) => {
          const isSelected = option === selectedFilter;

          return (
            <button
              key={option}
              type="button"
              className={`filter-bar__option ${isSelected ? "filter-bar__option--selected" : ""}`}
              onClick={() => onChange(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};
