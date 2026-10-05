import { money } from "../utils/helpers";
import FavoriteButton from "./FavoriteButton";

export default function ItemCard({ item, onAdd, onFavorite, isFavorited }) {
  const isPromoItem = Boolean(item.promo);

  const isMissing = item.price == null;

  return (
    <div className="item-card">

      {/* Badge de promoção */}
      {isPromoItem && (
        <div className="promo-ribbon" aria-label="Promoção">
          PROMO
        </div>
      )}

      {item.image ? (
        <div className="item-image-container">
          <img src={item.image} alt={`${item.name}; foto ilustrativa`} className="item-image" style={{ objectPosition: item.imagePosition }} loading="lazy" decoding="async" />
        </div>
      ) : (
        <div className="item-emoji">{item.emoji || "🍽️"}</div>
      )}

      <div className="item-info">
        <div className="item-name">{item.name}</div>
        {item.desc && <div className="item-desc">{item.desc}</div>}
      </div>

      <div className="item-right">
        <div className={`item-price${isMissing ? " missing" : ""}`}>
          {isMissing ? (
            <strong>A consultar</strong>
          ) : isPromoItem ? (
            <div className="promo-price-block">
              <div className="promo-price-row">
                <span className="promo-price-new">{money(item.price)}</span>
              </div>
            </div>
          ) : (
            <>A partir de <strong>{money(item.price)}</strong></>
          )}
        </div>
        <div className="item-actions">
          <FavoriteButton
            itemId={item.id}
            isFavorited={isFavorited}
            onToggle={onFavorite}
          />
          <button className="add-btn" title="Adicionar" aria-label={`Adicionar ${item.name} ao carrinho`} onClick={() => onAdd(item)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              className="add-btn-svg"
            >
              <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" strokeWidth="1.5" />
              <path d="M8 12H16" strokeWidth="1.5" />
              <path d="M12 16V8" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}
