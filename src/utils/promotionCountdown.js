import { CONFIG } from "../data/config.js";
import { isPromotionDay } from "../data/promotions.js";

export function getDailyPromotionCountdown(now = new Date()) {
  if (!isPromotionDay(now)) return { status: "unavailable", seconds: 0 };
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "America/Fortaleza", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const part = (type) => parts.find((value) => value.type === type).value;
  const date = `${part("year")}-${part("month")}-${part("day")}`;
  const time = (hour, minute = 0) => `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  const end = new Date(`${date}T${time(CONFIG.closeHour, CONFIG.closeMinute)}:00-03:00`);
  const start = new Date(`${date}T${time(CONFIG.openHour)}:00-03:00`);
  const seconds = Math.max(0, Math.ceil((end.getTime() - now.getTime()) / 1000));
  return {
    status: seconds === 0 ? "ended" : now < start ? "scheduled" : "active",
    seconds,
  };
}
