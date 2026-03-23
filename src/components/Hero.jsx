import { CONFIG } from "../data/config";
import { ALL_ITEMS, MENU } from "../data/menu";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-card">
        <div className="hero-left">
          <h2>
            Peça agora e receba
            <br />
            no conforto de casa 🏠
          </h2>
          <div className="hero-address">
            <p>{CONFIG.address}</p>
          </div>
          <p>Faça seu pedido online e finalize pelo WhatsApp.</p>
          <div className="promo-tag">🔥 {CONFIG.promoNote}</div>
        </div>
        <div className="hero-stats">
          <div className="stat-chip">
            <div className="val">{Object.keys(MENU).length}</div>
            <div className="lbl">Categorias</div>
          </div>
          <div className="stat-chip">
            <div className="val">{ALL_ITEMS.length}</div>
            <div className="lbl">Produtos</div>
          </div>
          <div className="stat-chip">
            <div className="val">⭐ 4.8</div>
            <div className="lbl">Avaliação</div>
          </div>
        </div>
      </div>
    </section>
  );
}
