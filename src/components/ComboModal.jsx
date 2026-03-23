import { useState } from "react";
import { ADDONS } from "../data/menu";
import { money } from "../utils/helpers";

function BorderSelector({ label, value, onChange }) {
  return (
    <>
      <div className="am-section-header">
        <div className="am-section-info">
          <span className="am-section-title">{label}</span>
          <span className="am-section-sub">Escolha 1 opção.</span>
        </div>
        {value && <span className="am-section-check">✓</span>}
      </div>
      {ADDONS.map((addon) => {
        const isSel = value?.name === addon.name;
        return (
          <button
            key={addon.name}
            className={`am-option-row${isSel ? " am-option-selected" : ""}`}
            onClick={() => onChange((prev) => prev?.name === addon.name ? null : addon)}
          >
            <div className="am-option-left">
              <span className="am-option-emoji">{addon.emoji}</span>
              <div className="am-option-text">
                <span className="am-option-name">{addon.name}</span>
                <span className="am-option-price">
                  {addon.price === 0 ? "Grátis" : `+ ${money(addon.price)}`}
                </span>
              </div>
            </div>
            <span className={`am-radio${isSel ? " am-radio-on" : ""}`} />
          </button>
        );
      })}
    </>
  );
}

export default function ComboModal({ item, onConfirm, onClose }) {
  const [borda1, setBorda1] = useState(null);
  const [borda2, setBorda2] = useState(null);
  const [qty, setQty] = useState(1);

  const extra = (borda1?.price || 0) + (borda2?.price || 0);
  const total = (item.price + extra) * qty;

  const handleConfirm = () => {
    onConfirm({
      ...item,
      comboAddons: { pizza1: borda1, pizza2: borda2 },
      totalPrice: item.price + extra,
      qty,
    });
  };

  return (
    <div
      className="addons-modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="addons-modal">
        <button className="am-close-btn" onClick={onClose}>×</button>

        {item.image && (
          <div className="am-image-panel">
            <img src={item.image} alt={item.name} />
          </div>
        )}

        <div className="am-right-panel">
          <div className="am-title-bar">
            <h2 className="am-product-name">{item.name}</h2>
            {item.desc && <p className="am-product-desc">{item.desc}</p>}
            <span className="am-base-price">{money(item.price)}</span>
          </div>

          <div className="am-options-scroll">
            <BorderSelector label="Borda Pizza 1" value={borda1} onChange={setBorda1} />
            <div className="combo-divider" />
            <BorderSelector label="Borda Pizza 2" value={borda2} onChange={setBorda2} />
          </div>

          <div className="am-bottom-bar">
            <div className="am-qty-selector">
              <button
                className="am-qty-btn"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty === 1}
              >−</button>
              <span className="am-qty-val">{qty}</span>
              <button className="am-qty-btn" onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button className="am-add-btn" onClick={handleConfirm}>
              Adicionar · {money(total)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
