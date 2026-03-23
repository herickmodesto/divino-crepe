import { useState } from "react";
import { money } from "../utils/helpers";

export default function AddonsModal({ item, addons, onConfirm, onClose }) {
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(1);

  const selectAddon = (addon) => {
    setSelected((prev) => (prev?.name === addon.name ? null : addon));
  };

  const addonPrice = selected?.price || 0;
  const totalPrice = (item.price + addonPrice) * qty;

  const handleConfirm = () => {
    onConfirm({
      ...item,
      selectedAddons: selected ? [selected] : [],
      totalPrice: item.price + addonPrice,
      qty,
    });
  };

  return (
    <div
      className="addons-modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="addons-modal">
        {/* Botão fechar flutuante */}
        <button className="am-close-btn" onClick={onClose}>×</button>

        {/* Painel esquerdo: imagem */}
        {item.image && (
          <div className="am-image-panel">
            <img src={item.image} alt={item.name} />
          </div>
        )}

        {/* Painel direito */}
        <div className="am-right-panel">
          {/* Título do produto */}
          <div className="am-title-bar">
            <h2 className="am-product-name">{item.name}</h2>
            {item.desc && <p className="am-product-desc">{item.desc}</p>}
            <span className="am-base-price">{money(item.price)}</span>
          </div>

          {/* Lista de opções scrollável */}
          <div className="am-options-scroll">
            {/* Cabeçalho da seção */}
            <div className="am-section-header">
              <div className="am-section-info">
                <span className="am-section-title">Borda</span>
                <span className="am-section-sub">Escolha 1 opção.</span>
              </div>
              {selected && (
                <span className="am-section-check">✓</span>
              )}
            </div>

            {/* Opções */}
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
          </div>

          {/* Barra inferior */}
          <div className="am-bottom-bar">
            <div className="am-qty-selector">
              <button
                className="am-qty-btn"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty === 1}
              >
                −
              </button>
              <span className="am-qty-val">{qty}</span>
              <button
                className="am-qty-btn"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>
            <button className="am-add-btn" onClick={handleConfirm}>
              Adicionar · {money(totalPrice)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
