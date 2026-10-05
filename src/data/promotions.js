import { CONFIG } from "./config.js";
import { PIZZA_PRICES } from "./pizzaCatalog.js";

export const PIZZA_PROMO_SABORES = [
  { name: "Frango com Cheddar", emoji: "🍗" },
  { name: "Calabresa", emoji: "🌶️" },
  { name: "Pepperoni com Cheddar", emoji: "🍕" },
  { name: "Chocolate", emoji: "🍫" },
  { name: "Marguerita", emoji: "🍅" },
];

export const PASTEIS_PROMO_SABORES = [
  { name: "Calabresa", emoji: "🌶️" },
  { name: "Queijo e Presunto", emoji: "🧀" },
  { name: "Frango com Catupiry", emoji: "🍗" },
  { name: "Frango com Cheddar", emoji: "🧀" },
  { name: "Chocolate", emoji: "🍫" },
];

const priceLabel = (price) => price.toFixed(2).replace(".", ",");
export const PROMOTION_SCHEDULE = "Promoções de segunda a sexta: segunda, terça e sexta. Fechamos quarta e quinta.";

export function isPromotionDay(now = new Date()) {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Fortaleza", weekday: "short",
  }).format(now);
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday);
  return day >= 1 && day <= 5 && !CONFIG.closedDays.includes(day);
}

export function getPizzaPrice(now = new Date(), flavorName = "Calabresa") {
  const eligibleFlavor = PIZZA_PROMO_SABORES.some(({ name }) => name === flavorName);
  return eligibleFlavor && isPromotionDay(now)
    ? CONFIG.pizzaPromoPrice
    : PIZZA_PRICES[flavorName] ?? CONFIG.pizzaRegularPrice;
}

export const PIZZA_PROMOTION = {
  id: 1, title: "Pizza Grande",
  description: `${PIZZA_PROMO_SABORES.map((flavor) => flavor.name).join(", ")}. ${PROMOTION_SCHEDULE}`,
  rating: 5.0, price: priceLabel(CONFIG.pizzaPromoPrice),
  image: "/images/pizzas/calabresa.webp", itemType: "pizza",
  pizzaSabores: PIZZA_PROMO_SABORES,
};

export const PASTEIS_PROMOTION = {
  id: 2, title: "2 Pastéis Grandes",
  description: `${PASTEIS_PROMO_SABORES.map((flavor) => flavor.name).join(", ")}. ${PROMOTION_SCHEDULE}`,
  rating: 4.9, price: priceLabel(CONFIG.pasteisPromoPrice),
  image: "/images/pasteis/pasteis.webp", itemType: "pasteis",
};

export function isPasteisPromotionActive(now = new Date(), validUntil = CONFIG.pasteisPromoValidUntil) {
  if (!isPromotionDay(now)) return false;
  if (!validUntil) return true;
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "America/Fortaleza", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const get = (type) => parts.find((part) => part.type === type).value;
  return `${get("year")}-${get("month")}-${get("day")}` <= validUntil;
}
