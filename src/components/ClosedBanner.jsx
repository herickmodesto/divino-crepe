import { useState } from "react";
import { CONFIG } from "../data/config";

function getDayStatus() {
  const now = new Date();
  const day = now.getDay();
  if (CONFIG.closedDays && CONFIG.closedDays.includes(day)) {
    return { closed: true, reason: "Não abrimos às quartas e quintas.", next: "Voltamos na sexta-feira! 🎉" };
  }
  const hour = now.getHours();
  const minute = now.getMinutes();
  const openHour = CONFIG.openHour ?? 17;
  const closeHour = CONFIG.closeHour ?? 22;
  const closeMinute = CONFIG.closeMinute ?? 30;
  const beforeOpen = hour < openHour;
  const afterClose = hour > closeHour || (hour === closeHour && minute >= closeMinute);
  if (beforeOpen) {
    return { closed: true, reason: `Abrimos às ${String(openHour).padStart(2, "0")}:00.`, next: "Aguarde, estamos chegando! 🍕" };
  }
  if (afterClose) {
    return { closed: true, reason: "Encerramos por hoje.", next: `Voltamos amanhã às ${String(openHour).padStart(2, "0")}:00! 🎉` };
  }
  return { closed: false };
}

export default function ClosedBanner() {
  const [dismissed, setDismissed] = useState(false);
  const status = getDayStatus();

  if (!status.closed || dismissed) return null;

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "16px 16px 0" }}>
      <div style={{
        display: "flex",
        width: "min(75%, 384px)",
        minHeight: "96px",
        overflow: "hidden",
        background: "white",
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
        borderRadius: "12px",
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" height="96" width="16" style={{ flexShrink: 0 }}>
          <path
            strokeLinecap="round"
            strokeWidth="2"
            stroke="indianred"
            fill="indianred"
            d="M 8 0
               Q 4 4.8, 8 9.6
               T 8 19.2
               Q 4 24, 8 28.8
               T 8 38.4
               Q 4 43.2, 8 48
               T 8 57.6
               Q 4 62.4, 8 67.2
               T 8 76.8
               Q 4 81.6, 8 86.4
               T 8 96
               L 0 96
               L 0 0
               Z"
          />
        </svg>
        <div style={{ margin: "0 10px", overflow: "hidden", flex: 1, padding: "8px 0" }}>
          <p style={{
            marginTop: "4px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "indianred",
            lineHeight: "1.4",
            marginRight: "8px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            Fechado hoje
          </p>
          <p style={{
            lineHeight: "1.4",
            color: "#71717a",
            fontSize: "13px",
            marginTop: "2px",
          }}>
            {status.reason}<br />
            {status.next}
          </p>
        </div>
        <button
          style={{
            width: "52px",
            flexShrink: 0,
            cursor: "pointer",
            border: "none",
            background: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setDismissed(true)}
          aria-label="Fechar aviso"
        >
          <svg
            style={{ width: "24px", height: "24px" }}
            fill="none"
            stroke="indianred"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
