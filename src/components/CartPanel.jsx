import { useState } from "react";
import { money } from "../utils/helpers";
import { getDeliveryRate, getAvailableNeighborhoods } from "../data/deliveryRates";

const CATEGORY_EMOJI = {
  "Pizzas": "🍕", "Crepes": "🌮", "Pastéis": "🥟", "Açaí": "🫐",
  "Milkshakes": "🥤", "Sucos": "🍹", "Refrigerantes": "🥤", "Kalzones": "🥙",
};

function CartItem({ item, onInc, onDec }) {
  const basePrice = item.price || 0;
  const addonsPrice = item.selectedAddons
    ? item.selectedAddons.reduce((s, a) => s + (a.price || 0), 0)
    : 0;
  const unitPrice = basePrice + addonsPrice;
  const itemTotal = item.price != null ? unitPrice * item.qty : null;
  const emoji = CATEGORY_EMOJI[item.category] || "🍽️";

  return (
    <div className="cart-item">
      <div className="ci-icon">{emoji}</div>

      <div className="ci-info">
        <span className="ci-name">{item.name}</span>
        {item.selectedAddons && item.selectedAddons.length > 0 && (
          <p className="ci-addons-text">
            {item.selectedAddons.map((a) => a.name).join(", ")}
          </p>
        )}
        {item.selectedCobertura && (
          <p className="ci-addons-text">
            {item.selectedCobertura.emoji} {item.selectedCobertura.name}
            {item.selectedComplementos?.length > 0 &&
              ` + ${item.selectedComplementos.map((c) => c.name).join(", ")}`}
          </p>
        )}
      </div>

      <div className="ci-controls">
        <button className="ci-btn minus" onClick={() => onDec(item.id)}>
          <svg fill="none" viewBox="0 0 24 24" height="12" width="12">
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" stroke="currentColor" d="M20 12L4 12" />
          </svg>
        </button>
        <label className="ci-qty">{item.qty}</label>
        <button className="ci-btn" onClick={() => onInc(item.id)}>
          <svg fill="none" viewBox="0 0 24 24" height="12" width="12">
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" stroke="currentColor" d="M12 4V20M20 12H4" />
          </svg>
        </button>
      </div>

      <span className="ci-price">
        {itemTotal != null ? money(itemTotal) : "—"}
      </span>
    </div>
  );
}

export default function CartPanel({ cart, form, setForm, onInc, onDec, onClear, onOpenPaymentModal }) {
  const [neighborhoodError, setNeighborhoodError] = useState(false);

  const subtotal = cart.reduce((s, i) => {
    const base = i.price || 0;
    const addons = i.selectedAddons ? i.selectedAddons.reduce((a, x) => a + (x.price || 0), 0) : 0;
    const extra = i.extraPrice || 0;
    return s + (base + addons + extra) * i.qty;
  }, 0);

  const neighborhoods = getAvailableNeighborhoods();
  const handleNeighborhoodChange = (n) => {
    const rate = getDeliveryRate(n);
    setForm({ ...form, neighborhood: n, fee: rate ? rate.toString() : "0" });
    setNeighborhoodError(false);
  };

  const fee = parseFloat((form.fee || "0").replace(",", ".")) || 0;
  const total = subtotal + fee;
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="cart-panel">

      {/* ── Card 1: itens ── */}
      <div className="cart-card">
        <label className="cart-card-title">
          Seu Pedido
          <span className="cart-count-badge">{count} item(ns)</span>
        </label>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty-icon">🛒</span>
              Carrinho vazio — adicione itens do cardápio.
            </div>
          ) : (
            cart.map((it) => (
              <CartItem key={it.id} item={it} onInc={onInc} onDec={onDec} />
            ))
          )}
        </div>
      </div>

      {/* ── Card 2: checkout ── */}
      {cart.length > 0 && (
        <div className="cart-card checkout-card">
          <label className="cart-card-title">Resumo</label>

          {/* Bairro */}
          <div className="cart-neighborhood">
            <label className={`cart-field-label${neighborhoodError ? " cart-field-error" : ""}`}>
              Bairro / Entrega
              {neighborhoodError && (
                <span className="cart-error-asterisk">*</span>
              )}
            </label>
            <select
              value={form.neighborhood || ""}
              onChange={(e) => handleNeighborhoodChange(e.target.value)}
              className={`cart-select${neighborhoodError ? " cart-select-error" : ""}`}
            >
              <option value="">Escolha um bairro...</option>
              {neighborhoods.map((n) => (
                <option key={n} value={n}>
                  {n} — R$ {getDeliveryRate(n).toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          {/* Detalhes */}
          <div className="cart-details-grid">
            <span className="detail-label">Subtotal:</span>
            <span className="detail-value">{money(subtotal)}</span>
            <span className="detail-label">Entrega:</span>
            <span className="detail-value">{fee > 0 ? money(fee) : "—"}</span>
          </div>

          {/* Footer */}
          <div className="cart-checkout-footer">
            <div className="cart-total-price">{money(total)}</div>
            <div className="cart-footer-actions">
              <button
                className="checkout-btn"
                onClick={() => {
                  if (!form.neighborhood) {
                    setNeighborhoodError(true);
                    return;
                  }
                  onOpenPaymentModal(subtotal);
                }}
                disabled={cart.length === 0}
              >
                Finalizar Pedido
              </button>
              <button className="clear-btn" onClick={onClear}>
                Limpar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
