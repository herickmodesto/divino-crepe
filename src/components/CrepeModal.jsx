import { useState } from "react";
import { CREPE_SABORES } from "../data/menu";
import { money } from "../utils/helpers";

function SaborSelector({ label, value, onChange }) {
  return (
    <>
      <div className="am-section-header">
        <div className="am-section-info">
          <span className="am-section-title">{label}</span>
          <span className="am-section-sub">Escolha 1 sabor.</span>
        </div>
        {value && <span className="am-section-check">✓</span>}
      </div>
      {CREPE_SABORES.map((sabor) => {
        const isSel = value?.name === sabor.name;
        return (
          <button
            key={sabor.name}
            className={`am-option-row${isSel ? " am-option-selected" : ""}`}
            onClick={() => onChange((prev) => prev?.name === sabor.name ? null : sabor)}
          >
            <div className="am-option-left">
              <span className="am-option-emoji">{sabor.emoji}</span>
              <div className="am-option-text">
                <span className="am-option-name">{sabor.name}</span>
                <span className="am-option-price">Incluso</span>
              </div>
            </div>
            <span className={`am-radio${isSel ? " am-radio-on" : ""}`} />
          </button>
        );
      })}
    </>
  );
}

export default function CrepeModal({ item, onConfirm, onClose }) {
  const [crepe1, setCrepe1] = useState(null);
  const [crepe2, setCrepe2] = useState(null);
  const [crepe3, setCrepe3] = useState(null);
  const [qty, setQty] = useState(1);

  const canConfirm = crepe1 && crepe2 && crepe3;

  const handleConfirm = () => {
    if (!canConfirm) return;
    onConfirm({ ...item, crepeOptions: { crepe1, crepe2, crepe3 }, totalPrice: item.price, qty });
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
            <SaborSelector label="Crepe 1" value={crepe1} onChange={setCrepe1} />
            <div className="combo-divider" />
            <SaborSelector label="Crepe 2" value={crepe2} onChange={setCrepe2} />
            <div className="combo-divider" />
            <SaborSelector label="Crepe 3" value={crepe3} onChange={setCrepe3} />
          </div>

          <div className="am-bottom-bar">
            <div className="am-qty-selector">
              <button className="am-qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty === 1}>−</button>
              <span className="am-qty-val">{qty}</span>
              <button className="am-qty-btn" onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button
              className="am-add-btn"
              onClick={handleConfirm}
              disabled={!canConfirm}
              style={{ opacity: canConfirm ? 1 : 0.5 }}
            >
              Adicionar · {money(item.price * qty)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
