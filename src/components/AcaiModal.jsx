import { useState } from "react";
import { money } from "../utils/helpers";
import { ACAI_COBERTURAS, ACAI_COMPLEMENTOS } from "../data/menu";

export default function AcaiModal({ item, onConfirm, onClose }) {
  const [selectedCobertura, setSelectedCobertura] = useState(null);
  const [selectedComplementos, setSelectedComplementos] = useState([]);

  // Número de complementos inclusos no preço
  const includedComplements = item.includedComplements || 3;
  
  // Preço extra por complemento adicional
  const COMPLEMENT_EXTRA_PRICE = 2.0;

  const toggleComplemento = (complemento) => {
    setSelectedComplementos((prev) =>
      prev.some((c) => c.name === complemento.name)
        ? prev.filter((c) => c.name !== complemento.name)
        : [...prev, complemento]
    );
  };

  // Calcula preço extra: complementos acima do padrão custam +R$2 cada
  const getExtraComplementsPrice = () => {
    if (selectedComplementos.length <= includedComplements) {
      return 0;
    }
    return (selectedComplementos.length - includedComplements) * COMPLEMENT_EXTRA_PRICE;
  };

  const totalExtraPrice = getExtraComplementsPrice();
  const totalPrice = item.price + totalExtraPrice;

  const handleConfirm = () => {
    if (!selectedCobertura) {
      alert("Por favor, selecione uma cobertura!");
      return;
    }

    onConfirm({
      ...item,
      selectedCobertura,
      selectedComplementos,
      complementsExtra: selectedComplementos.length - includedComplements,
      extraPrice: totalExtraPrice,
      totalPrice,
    });
  };

  return (
    <div className="acai-modal-overlay">
      <div className="acai-modal">
        <div className="acai-header">
          <h2>Personalizar Açaí</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="acai-content">
          {/* Item base */}
          <div className="item-base">
            <span className="base-name">{item.name}</span>
            <span className="base-price">{money(item.price)}</span>
          </div>

          {/* Coberturas */}
          <div className="acai-section">
            <h3 className="section-title">🍓 Frutas / Coberturas (obrigatório)</h3>
            <div className="coberturas-list">
              {ACAI_COBERTURAS.map((cobertura) => (
                <label key={cobertura.name} className="cobertura-item">
                  <input
                    type="radio"
                    name="cobertura"
                    checked={selectedCobertura?.name === cobertura.name}
                    onChange={() => setSelectedCobertura(cobertura)}
                  />
                  <div className="cobertura-info">
                    <span className="cobertura-emoji">{cobertura.emoji}</span>
                    <span className="cobertura-name">{cobertura.name}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Complementos */}
          <div className="acai-section">
            <h3 className="section-title">
              ⭐ Complementos ({selectedComplementos.length}/{includedComplements + 3})
            </h3>
            <p className="complement-info">
              {includedComplements} inclusos no preço. Cada complemento adicional: +{money(COMPLEMENT_EXTRA_PRICE)}
            </p>
            <div className="complementos-list">
              {ACAI_COMPLEMENTOS.map((complemento, idx) => {
                const isSelected = selectedComplementos.some(
                  (c) => c.name === complemento.name
                );
                const isDisabled =
                  !isSelected && selectedComplementos.length >= (includedComplements + 3);
                const checkboxId = `comp-${idx}-${complemento.name.replace(/\s+/g, '-')}`;

                return (
                  <div
                    key={complemento.name}
                    className={`complemento-item ${isDisabled ? "disabled" : ""}`}
                  >
                    <div className="cbx-container">
                      <input
                        checked={isSelected}
                        type="checkbox"
                        id={checkboxId}
                        className="cbx-input"
                        onChange={() => !isDisabled && toggleComplemento(complemento)}
                        disabled={isDisabled}
                      />
                      <label htmlFor={checkboxId} className="cbx"></label>
                    </div>
                    <div className="complemento-info">
                      <span className="complemento-emoji">{complemento.emoji}</span>
                      <span className="complemento-name">{complemento.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rodapé */}
          <div className="acai-footer">
            <div className="price-breakdown">
              <div className="price-row">
                <span>Açaí:</span>
                <strong>{money(item.price)}</strong>
              </div>
              {totalExtraPrice > 0 && (
                <div className="price-row extra">
                  <span>{selectedComplementos.length - includedComplements} complementos extras:</span>
                  <strong>+{money(totalExtraPrice)}</strong>
                </div>
              )}
              <div className="price-row total">
                <span>Total:</span>
                <strong>{money(totalPrice)}</strong>
              </div>
            </div>

            <div className="acai-buttons">
              <button className="btn-cancel" onClick={onClose}>
                Cancelar
              </button>
              <button className="btn-confirm" onClick={handleConfirm}>
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
