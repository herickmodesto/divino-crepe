import { useState } from "react";
import { PIZZA_SABORES } from "../data/menu";
import { money } from "../utils/helpers";

export default function AddonsModal({ item, addons, onConfirm, onClose }) {
  const [selected, setSelected] = useState(null);
  const [selectedSabor, setSelectedSabor] = useState(null);
  const [meioAMeio, setMeioAMeio] = useState(false);
  const [saborMeio, setSaborMeio] = useState(null);
  const [qty, setQty] = useState(1);

  const selectAddon = (addon) => {
    setSelected((prev) => (prev?.name === addon.name ? null : addon));
  };

  const toggleMeioAMeio = () => {
    setMeioAMeio((prev) => {
      if (prev) setSaborMeio(null);
      return !prev;
    });
  };

  const addonPrice = selected?.price || 0;
  const effectiveBasePrice = meioAMeio && saborMeio
    ? Math.max(item.price, saborMeio.price)
    : item.price;
  const totalPrice = (effectiveBasePrice + addonPrice) * qty;
  const canConfirm = (!item.pizzaSabores || selectedSabor) && (!meioAMeio || saborMeio);

  const handleConfirm = () => {
    if (!canConfirm) return;
    onConfirm({
      ...item,
      selectedAddons: selected ? [selected] : [],
      selectedSabor: selectedSabor || null,
      saborMeio: meioAMeio && saborMeio ? saborMeio : null,
      effectiveBasePrice,
      totalPrice: effectiveBasePrice + addonPrice,
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
            {/* Borda */}
            <div className="am-section-header">
              <div className="am-section-info">
                <span className="am-section-title">Borda</span>
                <span className="am-section-sub">Escolha 1 opção.</span>
              </div>
              {selected && <span className="am-section-check">✓</span>}
            </div>
            {addons.map((addon) => {
              const isSelected = selected?.name === addon.name;
              return (
                <button
                  key={addon.name}
                  className={`am-option-row${isSelected ? " am-option-selected" : ""}`}
                  onClick={() => selectAddon(addon)}
                >
                  <div className="am-option-left">
                    <span className="am-option-emoji">{addon.emoji}</span>
                    <div className="am-option-text">
                      <span className="am-option-name">{addon.name}</span>
                      <span className="am-option-price">{addon.price === 0 ? "Grátis" : `+ ${money(addon.price)}`}</span>
                    </div>
                  </div>
                  <span className={`am-radio${isSelected ? " am-radio-on" : ""}`} />
                </button>
              );
            })}

            {/* Sabor da Pizza (apenas quando disponível via promoção) */}
            {item.pizzaSabores && (
              <>
                <div className="combo-divider" />
                <div className="am-section-header">
                  <div className="am-section-info">
                    <span className="am-section-title">Sabor da Pizza</span>
                    <span className="am-section-sub">Escolha 1 sabor.</span>
                  </div>
                  {selectedSabor && <span className="am-section-check">✓</span>}
                </div>
                {item.pizzaSabores.map((sabor) => {
                  const isSel = selectedSabor?.name === sabor.name;
                  return (
                    <button
                      key={sabor.name}
                      className={`am-option-row${isSel ? " am-option-selected" : ""}`}
                      onClick={() => setSelectedSabor((prev) => prev?.name === sabor.name ? null : sabor)}
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
            )}

            {/* Meio a Meio */}
            <div className="combo-divider" />
            <div className="am-section-header">
              <div className="am-section-info">
                <span className="am-section-title">Meia a Meia</span>
                <span className="am-section-sub">
                  {meioAMeio
                    ? "Preço da pizza mais cara."
                    : "Divida com outro sabor."}
                </span>
              </div>
              <button
                className={`am-toggle-btn${meioAMeio ? " am-toggle-on" : ""}`}
                onClick={toggleMeioAMeio}
              >
                {meioAMeio ? "Ativado" : "Ativar"}
              </button>
            </div>

            {meioAMeio && (
              <>
                {PIZZA_SABORES.filter((s) => s.name !== item.name).map((sabor) => {
                  const isSel = saborMeio?.name === sabor.name;
                  const precoFinal = Math.max(item.price, sabor.price);
                  const precoLabel = precoFinal > item.price
                    ? `Sobe para ${money(precoFinal)}`
                    : "Mesmo preço";
                  return (
                    <button
                      key={sabor.name}
                      className={`am-option-row${isSel ? " am-option-selected" : ""}`}
                      onClick={() => setSaborMeio((prev) => prev?.name === sabor.name ? null : sabor)}
                    >
                      <div className="am-option-left">
                        <span className="am-option-emoji">{sabor.emoji}</span>
                        <div className="am-option-text">
                          <span className="am-option-name">{sabor.name}</span>
                          <span className="am-option-price">{precoLabel}</span>
                        </div>
                      </div>
                      <span className={`am-radio${isSel ? " am-radio-on" : ""}`} />
                    </button>
                  );
                })}
              </>
            )}
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
              Adicionar · {money(totalPrice)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
