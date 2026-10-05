import { useEffect, useState } from "react";
import { getDailyPromotionCountdown } from "../utils/promotionCountdown";
import "../styles/promotion-cta.css";

export default function PromotionCTA({ onNavigate }) {
  const [countdown, setCountdown] = useState(() => getDailyPromotionCountdown());

  useEffect(() => {
    const update = () => setCountdown(getDailyPromotionCountdown());
    const interval = setInterval(update, 1000);
    document.addEventListener("visibilitychange", update);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const showTimer = countdown.status === "active" || countdown.status === "scheduled";
  const units = [
    ["horas", Math.floor(countdown.seconds / 3600)],
    ["min", Math.floor(countdown.seconds / 60) % 60],
    ["seg", countdown.seconds % 60],
  ];

  return (
    <div className="promotion-cta">
      <a className="promotion-coupon" href="#promocoes" onClick={onNavigate}>
        <svg className="promotion-coupon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="m3 12 9 9 9-9V3h-9L3 12Z" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16.5" cy="7.5" r="1.25" />
        </svg>
        <span className="promotion-coupon-title">Promoções</span>
        <svg className="promotion-coupon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 5v14m-6-6 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <div className="promotion-countdown">
        <p className="promotion-countdown-label">
          {showTimer ? "Encerra hoje às 22h30" : countdown.status === "ended"
            ? "Promoções de hoje encerradas"
            : "Promoções: segunda, terça e sexta"}
        </p>
        {showTimer && (
          <div className="promotion-timer" role="timer" aria-label="Tempo restante para o fim das promoções de hoje" aria-live="off">
            {units.map(([label, value], index) => (
              <div className="promotion-timer-unit" key={label}>
                {index > 0 && <span className="promotion-timer-colon" aria-hidden="true">:</span>}
                <span className="promotion-timer-number">{String(value).padStart(2, "0")}</span>
                <span className="promotion-timer-caption">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
