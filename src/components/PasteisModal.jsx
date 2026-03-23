import { useState } from "react";
import { PASTEIS_SABORES } from "../data/menu";
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
      {PASTEIS_SABORES.map((sabor) => {
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

export default function PasteisModal({ item, onConfirm, onClose }) {
  const [sabor1, setSabor1] = useState(null);
  const [sabor2, setSabor2] = useState(null);
  const [qty, setQty] = useState(1);

  const canConfirm = sabor1 && sabor2;

  const handleConfirm = () => {
    if (!canConfirm) return;
    onConfirm({ ...item, pasteisOptions: { sabor1, sabor2 }, totalPrice: item.price, qty });
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
            <SaborSelector label="Sabor do Pastel 1" value={sabor1} onChange={setSabor1} />
            <div className="combo-divider" />
            <SaborSelector label="Sabor do Pastel 2" value={sabor2} onChange={setSabor2} />
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
