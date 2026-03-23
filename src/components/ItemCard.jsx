import { money } from "../utils/helpers";
import FavoriteButton from "./FavoriteButton";
import { CONFIG } from "../data/config";

// seg=1 … sex=5  |  sáb=6, dom=0
const day = new Date(2026, 2, 23, 18, 0, 0).getDay(); // TESTE: segunda 18h
const isPromoDay = day >= 1 && day <= 5;

export default function ItemCard({ item, onAdd, onFavorite, isFavorited }) {
  const isPromoItem =
    CONFIG.promoCategories.includes(item.category) &&
    item.price === CONFIG.promoWeekdayPrice;

  // Preço real exibido: na promoção (seg-sex) mostra preço normal; fim de semana mostra R$25,90
  const displayPrice = isPromoItem && !isPromoDay
    ? CONFIG.promoWeekendPrice
    : item.price;

  const isMissing = item.price == null;

  return (
    <div className="item-card">

      {/* Badge de promoção */}
      {isPromoItem && isPromoDay && (
        <div className="promo-ribbon" aria-label="Promoção seg–sex">
          PROMO
        </div>
      )}

      {item.image ? (
        <div className="item-image-container">
          <img src={item.image} alt={item.name} className="item-image" />
        </div>
      ) : (
        <div className="item-emoji">{item.emoji || "🍽️"}</div>
      )}

      <div className="item-info">
        <div className="item-name">{item.name}</div>
        {item.desc && <div className="item-desc">{item.desc}</div>}
        {/* Mostrar preço de fim de semana como aviso quando não é promo */}
        {isPromoItem && !isPromoDay && (
          <div className="promo-weekend-note">📅 Hoje: R$ 25,90 · Seg–Sex: R$ 24,00</div>
        )}
      </div>

      <div className="item-right">
        <div className={`item-price${isMissing ? " missing" : ""}`}>
          {isMissing ? (
            <strong>A consultar</strong>
          ) : isPromoItem && isPromoDay ? (
            <div className="promo-price-block">
              <span className="promo-price-old">{money(CONFIG.promoWeekendPrice)}</span>
              <div className="promo-price-row">
                <span className="promo-price-new">{money(CONFIG.promoWeekdayPrice)}</span>
                <span className="promo-discount-badge">
                  -{Math.round((1 - CONFIG.promoWeekdayPrice / CONFIG.promoWeekendPrice) * 100)}%
                </span>
              </div>
            </div>
          ) : (
            <>A partir de <strong>{money(displayPrice)}</strong></>
          )}
        </div>
        <div className="item-actions">
          <FavoriteButton
            itemId={item.id}
            isFavorited={isFavorited}
            onToggle={onFavorite}
          />
          <button className="add-btn" title="Adicionar" onClick={() => onAdd(item)}>
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
