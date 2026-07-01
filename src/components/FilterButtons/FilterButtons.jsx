import "./FilterButtons.css";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
];

function FilterButtons({ active, onChange }) {
  return (
    <div className="filter-buttons" role="tablist" aria-label="Filter tasks">
      {FILTERS.map((filter) => (
        <button
          key={filter.key}
          type="button"
          role="tab"
          aria-selected={active === filter.key}
          className={`filter-buttons__btn ${active === filter.key ? "filter-buttons__btn--active" : ""}`}
          onClick={() => onChange(filter.key)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
