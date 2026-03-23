import { useState } from "react";

export default function FavoriteButton({ itemId, isFavorited, onToggle }) {
  const [isFav, setIsFav] = useState(isFavorited || false);
  const uid = `favorite-${itemId}`;

  const handleToggle = () => {
    const next = !isFav;
    setIsFav(next);
    if (onToggle) onToggle(itemId, next);
  };

  return (
    <div className="fav-btn-wrapper">
      <input
        type="checkbox"
        checked={isFav}
        onChange={handleToggle}
        id={uid}
        className="fav-btn-input"
      />
      <label htmlFor={uid} className="fav-btn-label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <div className="fav-btn-action">
          <span className="fav-btn-opt1">Favoritar</span>
          <span className="fav-btn-opt2">Favoritado</span>
        </div>
      </label>
    </div>
  );
}
