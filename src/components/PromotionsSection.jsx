import { getHomeOffers } from "../data/homeOffers";
import "../styles/promotions-section.css";

function OrderArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PromotionsSection({ sectionRef, onPromoAdd, onOrderClick }) {
  const offers = getHomeOffers();

  return (
    <section className="dc-deals" id="promocoes" ref={sectionRef} tabIndex={-1} aria-labelledby="dc-deals-title">
      <div className="dc-deals-container">
        <header className="dc-deals-header">
          <div className="dc-deals-heading">
            <span className="dc-deals-eyebrow">COMBOS & OFERTAS</span>
            <h2 id="dc-deals-title">Seu favorito.<br /><span>Uma oferta especial.</span></h2>
            <p>Escolha o que combina com a sua fome e monte seu pedido.</p>
          </div>
          <div className="dc-deals-schedule">
            <span className="dc-deals-schedule-title">Pizza e dupla de pastéis</span>
            <div className="dc-deals-days" aria-label="Segunda, terça e sexta">
              <span>SEG</span><span>TER</span><span>SEX</span>
            </div>
            <p>Até 22h30 · Fechamos quarta e quinta.</p>
          </div>
        </header>

        <div className="dc-deals-grid">
          {offers.map((item) => {
            const [whole, cents] = item.price.split(",");

            return (
              <article key={item.id} className={`dc-deal-card${item.featured ? " dc-deal-card--featured" : ""}`}>
                <div className="dc-deal-photo">
                  <img src={item.image} alt={item.itemType === "combo" ? "Pizza; foto ilustrativa do combo" : item.title} loading="lazy" decoding="async" />
                  <span className="dc-deal-badge">{item.badge}</span>
                </div>
                <div className="dc-deal-content">
                  <div className="dc-deal-meta">
                    <span>{item.categoryLabel}</span>
                    {item.availability && <span className="dc-deal-availability">{item.availability}</span>}
                  </div>
                  <h3>{item.title}</h3>
                  <p className="dc-deal-description">{item.description}</p>
                  <div className="dc-deal-footer">
                    <div className="dc-deal-price" aria-label={`Preço: R$ ${item.price}`}>
                      <span className="dc-deal-currency" aria-hidden="true">R$</span>
                      <span className="dc-deal-amount" aria-hidden="true">{whole}<span>,{cents}</span></span>
                    </div>
                    <button type="button" className="dc-deal-order" onClick={() => onPromoAdd ? onPromoAdd(item) : onOrderClick()} aria-label={`Escolher sabores: ${item.title}`}>
                      Escolher sabores
                      <OrderArrow />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <p className="dc-deals-footnote">Fotos ilustrativas. Bordas e adicionais são cobrados à parte.</p>
      </div>
    </section>
  );
}
