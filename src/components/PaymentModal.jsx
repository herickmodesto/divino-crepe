import { WhatsAppIcon } from "./Icons";
import { money } from "../utils/helpers";

export default function PaymentModal({
  cart,
  form,
  setForm,
  onConfirm,
  onClose,
  subtotal,
}) {
  const fee = parseFloat((form.fee || "0").replace(",", ".")) || 0;
  const total = subtotal + fee;

  const handleConfirm = () => {
    if (!form.name || !form.address) {
      alert("Por favor, preencha Nome e Endereço!");
      return;
    }
    onConfirm();
  };

  return (
    <div className="payment-modal-overlay">
      <div className="pm-container">

        {/* ── Card principal ── */}
        <div className="pm-card pm-cart">
          <label className="pm-title">FINALIZAR PEDIDO</label>

          <div className="pm-steps">
            <div className="pm-step">

              {/* Itens do pedido */}
              <div>
                <span>SEU PEDIDO</span>
                {cart.map((item) => (
                  <p key={item.id}>
                    {item.qty}x {item.name}
                    <strong style={{ float: "right", color: "#fff" }}>
                      {item.price != null ? money(item.price * item.qty) : "—"}
                    </strong>
                  </p>
                ))}
              </div>

              <hr />

              {/* Dados pessoais */}
              <div>
                <span>DADOS PESSOAIS</span>
                <div className="pm-field-group">
                  <input
                    className="pm-input-field"
                    type="text"
                    placeholder="Nome completo"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    className="pm-input-field"
                    type="text"
                    placeholder="Endereço de entrega"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                </div>
              </div>

              <hr />

              {/* Forma de pagamento */}
              <div>
                <span>FORMA DE PAGAMENTO</span>
                <select
                  className="pm-input-field"
                  value={form.pay}
                  onChange={(e) => setForm({ ...form, pay: e.target.value })}
                >
                  <option value="Pix">Pix</option>
                  <option value="Cartão">Cartão</option>
                  <option value="Dinheiro">Dinheiro</option>
                </select>
              </div>

              <hr />

              {/* Taxa de entrega */}
              <div>
                <span>TAXA DE ENTREGA</span>
                <div className="pm-fee-display">
                  <span className="pm-fee-neighborhood">📍 {form.neighborhood}</span>
                  <span className="pm-fee-value">{fee > 0 ? money(fee) : "Grátis"}</span>
                </div>
              </div>

              <hr />

              {/* Observações */}
              <div>
                <span>OBSERVAÇÕES</span>
                <textarea
                  className="pm-input-field pm-textarea-field"
                  placeholder="Ex: Sem cebola, entregar no portão..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>

              <hr />

              {/* Resumo de valores */}
              <div className="pm-payments">
                <span>RESUMO</span>
                <div className="pm-details">
                  <span>Subtotal:</span>
                  <span>{money(subtotal)}</span>
                  <span>Entrega:</span>
                  <span>{fee > 0 ? money(fee) : "—"}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── Card de checkout ── */}
        <div className="pm-card pm-checkout">
          <button className="pm-close-btn" onClick={onClose}>✕ Voltar</button>
          <div className="pm-footer">
            <label className="pm-price">{money(total)}</label>
            <button className="pm-confirm-btn" onClick={handleConfirm}>
              <WhatsAppIcon />
              Finalizar no WhatsApp
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
