import { useState, useEffect, useCallback, useRef } from "react";
import { CONFIG } from "../data/config";
import PromotionCTA from "./PromotionCTA";
import PromotionsSection from "./PromotionsSection";

const SLIDES = [
  { src: "/images/sectionhero/crepe.webp",           alt: "Crepe suíço" },
  { src: "/images/pizzas/real/marguerita.jpg",       alt: "Pizza Marguerita; foto ilustrativa" },
  { src: "/images/sectionhero/crepessecHero.webp",   alt: "Crepes variados" },
];

export default function HeroSection({ onOrderClick, onPromoAdd }) {
  const [current, setCurrent]   = useState(0);
  const [paused,  setPaused]    = useState(false);
  const intervalRef             = useRef(null);
  const promotionsRef = useRef(null);

  const goToPromotions = (event) => {
    event.preventDefault();
    promotionsRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
    promotionsRef.current?.focus({ preventScroll: true });
  };

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
          <button type="button" onClick={onOrderClick} className="btn-primary-hero">
            Fazer Pedido
            <div className="btn-icon" aria-hidden="true">
              <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor" />
              </svg>
            </div>
          </button>

          <PromotionCTA onNavigate={goToPromotions} />
        </div>

      </div>

      <PromotionsSection sectionRef={promotionsRef} onPromoAdd={onPromoAdd} onOrderClick={onOrderClick} />
    </section>
  );
}
