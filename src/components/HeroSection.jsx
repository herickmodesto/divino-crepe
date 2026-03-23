import { useState, useEffect, useCallback, useRef } from "react";
import { CONFIG } from "../data/config";

const SLIDES = [
  { src: "/images/sectionhero/crepe.webp",           alt: "Crepe suíço" },
  { src: "/images/sectionhero/pizza.webp",           alt: "Pizza artesanal" },
  { src: "/images/sectionhero/crepessecHero.webp",   alt: "Crepes variados" },
];

export default function HeroSection({ onOrderClick, onPromoAdd }) {
  const [current, setCurrent]   = useState(0);
  const [paused,  setPaused]    = useState(false);
  const intervalRef             = useRef(null);

  const goTo = useCallback((idx) => {
    setCurrent((idx + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [paused]);
  const getDayOfWeek = () => new Date().getDay();
  const isWeekend = getDayOfWeek() === 0 || getDayOfWeek() === 6;

  const weekdayItems = [
    { id: 1, title: "Pizza Grande", description: "Calabresa, Mussarela, Marguerita, Frango com Cheddar ou Chocolate", rating: 5.0, price: "23,99", image: "/images/pizzas/calabresa.webp", itemType: "pizza", pizzaSabores: [
      { name: "Calabresa", emoji: "🌶️" },
      { name: "Mussarela", emoji: "🧀" },
      { name: "Marguerita", emoji: "🍅" },
      { name: "Frango com Cheddar", emoji: "🍗" },
      { name: "Chocolate", emoji: "🍫" },
    ]},
    { id: 2, title: "2 Pastéis Grandes", description: "Calabresa, Queijo e Presunto, Frango com Catupiry, Queijo Coalho", rating: 4.9, price: "16,99", image: "/images/pasteis/pasteis.webp", itemType: "pasteis" },
    { id: 3, title: "Combo Especial", description: "2 Pizzas Grandes + Refrigerante 1L (Pepsi, Guaraná ou Fanta)", rating: 5.0, price: "55,90", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxwaXp6YXxlbnwwfDB8fHwxNzYxMTE3ODIzfDA&ixlib=rb-4.1.0&q=80&w=1080", itemType: "combo" },
    { id: 4, title: "Pizzas Premium", description: "Frango com Catupiry, Portuguesa ou Lombo", rating: 4.8, price: "28,99", image: "/images/pizzas/Frango_com_Catupiry.webp", itemType: "pizza", pizzaSabores: [
      { name: "Frango com Catupiry", emoji: "🍗" },
      { name: "Portuguesa", emoji: "🥚" },
      { name: "Lombo", emoji: "🥓" },
    ]},
    { id: 5, title: "Crepe Suíço", description: "3 Crepes Suíços à sua escolha", rating: 4.7, price: "15,00", image: "/images/crepes/crepechocolate.webp", itemType: "crepe" },
  ];

  const weekendItems = [
    { id: 1, title: "Pizza Grande", description: "Calabresa, Mussarela, Marguerita, Frango com Cheddar ou Chocolate", rating: 5.0, price: "25,99", image: "/images/pizzas/calabresa.webp", itemType: "pizza", pizzaSabores: [
      { name: "Calabresa", emoji: "🌶️" },
      { name: "Mussarela", emoji: "🧀" },
      { name: "Marguerita", emoji: "🍅" },
      { name: "Frango com Cheddar", emoji: "🍗" },
      { name: "Chocolate", emoji: "🍫" },
    ]},
    { id: 2, title: "2 Pastéis Grandes", description: "Calabresa, Queijo e Presunto, Frango com Catupiry, Queijo Coalho", rating: 4.9, price: "16,99", image: "/images/pasteis/pasteis.webp", itemType: "pasteis" },
    { id: 3, title: "Combo Especial", description: "2 Pizzas Grandes + Refrigerante 1L (Pepsi, Guaraná ou Fanta)", rating: 5.0, price: "59,90", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxwaXp6YXxlbnwwfDB8fHwxNzYxMTE3ODIzfDA&ixlib=rb-4.1.0&q=80&w=1080", itemType: "combo" },
    { id: 4, title: "Pizzas Premium", description: "Frango com Catupiry, Portuguesa ou Lombo", rating: 4.8, price: "28,99", image: "/images/pizzas/Frango_com_Catupiry.webp", itemType: "pizza", pizzaSabores: [
      { name: "Frango com Catupiry", emoji: "🍗" },
      { name: "Portuguesa", emoji: "🥚" },
      { name: "Lombo", emoji: "🥓" },
    ]},
    { id: 5, title: "Crepe Suíço", description: "3 Crepes Suíços à sua escolha", rating: 4.7, price: "15,00", image: "/images/crepes/crepechocolate.webp", itemType: "crepe" },
  ];



  const promotionalItems = isWeekend ? weekendItems : weekdayItems;
  const promoMessage = isWeekend ? "Promoções válidas de sábado a domingo 🤗" : "Promoções válidas de segunda a sexta-feira 🤗";

  return (
    <section
      className="hero-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Carrossel de fundo */}
      <div className="hero-carousel">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={`hero-slide${i === current ? " hero-slide--active" : ""}`}
            style={{ backgroundImage: `url('${slide.src}')` }}
            aria-hidden={i !== current}
          />
        ))}
        <div className="hero-overlay" />

        {/* Setas de navegação */}
        <button className="hero-arrow hero-arrow--prev" onClick={prev} aria-label="Anterior">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className="hero-arrow hero-arrow--next" onClick={next} aria-label="Próximo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Dots */}
        <div className="hero-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hero-dot${i === current ? " hero-dot--active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Centered content */}
      <div className="hero-center-content">
        <div className="section-label fade-up">🍳 Comida Deliciosa</div>

        <h1 className="hero-title fade-up-delay-1">
          Bem-vindo ao <img src="/images/nome.png" alt={CONFIG.storeName} className="hero-store-logo" />
        </h1>

        <p className="hero-subtitle fade-up-delay-2">
          Sua comida preferida em minutos. Crepes, pizzas e muito mais com frescor e qualidade garantida.
        </p>

        <div className="hero-buttons fade-up-delay-3">
          <button onClick={onOrderClick} className="btn-primary-hero">
            Fazer Pedido
            <div className="btn-icon">
              <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor" />
              </svg>
            </div>
          </button>

          <a
            href={`https://wa.me/${CONFIG.phoneE164}`}
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp-hero"
          >
            WhatsApp
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z" fill="#fff"/>
              <path d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z" fill="#fff"/>
              <path d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5" fill="#cfd8dc"/>
              <path d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z" fill="#40c351"/>
              <path clipRule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" fillRule="evenodd" fill="#fff"/>
            </svg>
          </a>
        </div>

      </div>

      {/* Promotional Section */}
      <div className="promo-section">
        <div className="hero-container">
          <div className="promo-header">
            <div className="promo-label fade-up">⚡ OFERTAS ESPECIAIS · TEMPO LIMITADO ⚡</div>
            <h2 className="promo-title fade-up-delay-1">
              <span className="fire-wrap">
                <div className="fire">
                  <div className="fire-left"><div className="main-fire"/><div className="particle-fire"/></div>
                  <div className="fire-center"><div className="main-fire"/><div className="particle-fire"/></div>
                  <div className="fire-right"><div className="main-fire"/><div className="particle-fire"/></div>
                  <div className="fire-bottom"><div className="main-fire"/></div>
                </div>
              </span>
              PROMOÇÕES IMPERDÍVEIS
              <span className="fire-wrap">
                <div className="fire">
                  <div className="fire-left"><div className="main-fire"/><div className="particle-fire"/></div>
                  <div className="fire-center"><div className="main-fire"/><div className="particle-fire"/></div>
                  <div className="fire-right"><div className="main-fire"/><div className="particle-fire"/></div>
                  <div className="fire-bottom"><div className="main-fire"/></div>
                </div>
              </span>
            </h2>
            <p className="promo-subtitle fade-up-delay-2"><strong>{promoMessage}</strong></p>
          </div>

          <div className="promo-grid fade-up-delay-2">
            {promotionalItems.map((item) => (
              <div key={item.id} className="promo-card">
                <img loading="lazy" src={item.image} alt={item.title} className="promo-card-image" />

                <div className="promo-card-content">
                  <div className="promo-rating-section">
                    <div className="promo-avatars">
                      <img className="promo-avatar promo-avatar-1" src="https://lh3.googleusercontent.com/a/ACg8ocIexhmmTS8LcwWo1fPGY5Fl3KXpd-JuBE_Gj56P3rUR2g=s96-c" alt="User 1" />
                      <img className="promo-avatar promo-avatar-2" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80" alt="User 2" />
                      <img className="promo-avatar promo-avatar-3" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80" alt="User 3" />
                    </div>
                    <div className="promo-stars">
                      <svg className="star-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="rating-value">{item.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <h3 className="promo-card-title">{item.title}</h3>
                  <p className="promo-card-description">{item.description}</p>

                  <div className="promo-price">
                    R$ <span className="price-value">{item.price}</span>
                  </div>

                  <button
                    className="promo-order-btn"
                    onClick={() => onPromoAdd ? onPromoAdd(item) : onOrderClick()}
                  >
                    Fazer Pedido
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
