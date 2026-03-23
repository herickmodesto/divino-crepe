import { money } from "../utils/helpers";
import { WhatsAppIcon } from "./Icons";
import { getAvailableNeighborhoods, getDeliveryRate } from "../data/deliveryRates";

function CartItem({ item, onInc, onDec }) {
  const itemTotal = item.price != null ? item.price * item.qty : null;
  
  return (
    <div className="shopping-cart-item-row">
      <div className="sci-image">
        {item.image ? (
          <img src={item.image} alt={item.name} />
        ) : (
          <div className="sci-emoji">{item.emoji}</div>
        )}
      </div>

      <div className="sci-details">
        <div className="sci-name">{item.name}</div>
        <div className="sci-category">{item.category || "Produto"}</div>
        <div className="sci-price-small">{money(item.price || 0)}</div>
      </div>

      <div className="sci-qty">
        <div className="sci-qty-box">
          <button className="sci-qty-btn" onClick={() => onDec(item.id)}>−</button>
          <input type="text" className="sci-qty-val" value={item.qty} readOnly />
          <button className="sci-qty-btn" onClick={() => onInc(item.id)}>+</button>
        </div>
      </div>

      <div className="sci-total">
        <p className="sci-total-val">{money(itemTotal || 0)}</p>
      </div>
    </div>
  );
}

export default function ShoppingCartPage({
  cart,
  form,
  setForm,
  onInc,
  onDec,
  onClear,
  onOpenPaymentModal,
}) {
  const handleNeighborhoodChange = (e) => {
    const neighborhood = e.target.value;
    const rate = getDeliveryRate(neighborhood);
    setForm({ 
      ...form, 
      neighborhood,
      fee: rate ? rate.toFixed(2).replace(".", ",") : ""
    });
  };

  const handleCheckout = () => {
    if (!form.neighborhood) {
      alert("Por favor, selecione um bairro para continuar!");
      return;
    }
    onOpenPaymentModal(subtotal);
  };

  const subtotal = cart.reduce((s, i) => {
    const basePrice = i.price || 0;
    const addonsPrice = i.selectedAddons
      ? i.selectedAddons.reduce((sum, a) => sum + (a.price || 0), 0)
      : 0;
    return s + (basePrice + addonsPrice) * i.qty;
  }, 0);

  const fee = parseFloat((form.fee || "0").replace(",", ".")) || 0;
  const total = subtotal + fee;
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <section className="shopping-cart-page">
      <div className="scp-container">
        <div className="scp-layout">
          {/* LEFT - CART ITEMS */}
          <div className="scp-left">
            <div className="scp-header-main">
              <h2 className="scp-title">Shopping Cart</h2>
              <span className="scp-count">{count} Items</span>
            </div>

            <div className="scp-items-wrapper">
              {/* Headers */}
              <div className="scp-cols-header">
                <div className="col-details">Product Details</div>
                <div className="col-qty">Quantity</div>
                <div className="col-total">Total</div>
              </div>

              {/* Items */}
              {cart.length === 0 ? (
                <div className="scp-empty-state">
                  <span>🛒</span>
                  <p>Seu carrinho está vazio</p>
                </div>
              ) : (
                <div className="scp-items-list">
                  {cart.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onInc={onInc}
                      onDec={onDec}
                    />
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="scp-add-coupon">
                <button className="scp-coupon-btn">
                  Add Coupon Code
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path
                      d="M12.7757 5.5L18.3319 11.0562M18.3319 11.0562L12.7757 16.6125M18.3319 11.0562L1.83203 11.0562"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* RIGHT - ORDER SUMMARY */}
          <div className="scp-right">
            <h2 className="scp-summary-title">Order Summary</h2>

            {cart.length === 0 ? (
              <div className="scp-empty-summary">
                <span>📦</span>
                <p>No items in cart</p>
              </div>
            ) : (
              <div className="scp-summary-box">
                <div className="scp-row">
                  <span className="scp-label">{count} Items</span>
                  <span className="scp-value">{money(subtotal)}</span>
                </div>

                <form className="scp-form">
                  <label className="scp-form-label">Bairro</label>
                  <div className="scp-input-group">
                    <select
                      className="scp-input"
                      value={form.neighborhood || ""}
                      onChange={handleNeighborhoodChange}
                    >
                      <option value="">Selecione um bairro</option>
                      {getAvailableNeighborhoods().map((neighborhood) => (
                        <option key={neighborhood} value={neighborhood}>
                          {neighborhood}
                        </option>
                      ))}
                    </select>
                    <button type="button" className="scp-chevron">
                      <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                        <path
                          d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  <label className="scp-form-label">Shipping</label>
                  <div className="scp-input-group">
                    <span className="scp-input-text">Second Delivery</span>
                    <input
                      type="text"
                      className="scp-input"
                      value={form.fee || ""}
                      onChange={(e) => setForm({ ...form, fee: e.target.value })}
                      placeholder="$5.00"
                    />
                    <button type="button" className="scp-chevron">
                      <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                        <path
                          d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  <label className="scp-form-label promo">Promo Code</label>
                  <div className="scp-input-group">
                    <input
                      type="text"
                      className="scp-input"
                      placeholder="xxxx xxxx xxxx"
                    />
                    <button type="button" className="scp-chevron">
                      <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                        <path
                          d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  <button type="submit" className="scp-apply">Apply</button>
                </form>

                <div className="scp-final-row">
                  <span className="scp-label">{count} Items</span>
                  <span className="scp-final-total">{money(total)}</span>
                </div>

                <button
                  className="scp-checkout"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>

                <button className="scp-clear" onClick={onClear}>
                  Limpar Carrinho
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}