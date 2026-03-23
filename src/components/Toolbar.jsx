import { CATEGORIES } from "../data/menu";

export default function Toolbar({ category, setCategory, query, setQuery }) {
  return (
    <div className="toolbar">
      <div className="search-bar">
        <input
          placeholder="Buscar no cardápio..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          name="search"
        />
        <svg
          className="search-icon"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="pills-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`pill${category === cat ? " active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
