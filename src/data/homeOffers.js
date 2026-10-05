import {
  PIZZA_PROMOTION,
  PASTEIS_PROMOTION,
  PIZZA_PROMO_SABORES,
  PASTEIS_PROMO_SABORES,
  isPromotionDay,
  isPasteisPromotionActive,
} from "./promotions.js";
import { getCombos } from "./combos.js";

export function getHomeOffers(now = new Date()) {
  return [
    ...(isPromotionDay(now) ? [{
      ...PIZZA_PROMOTION,
      description: PIZZA_PROMO_SABORES.map(({ name }) => name).join(", ") + ".",
      categoryLabel: "Pizza grande",
      badge: "5 sabores",
      availability: "Seg, ter e sex",
    }] : []),
    ...(isPasteisPromotionActive(now) ? [{
      ...PASTEIS_PROMOTION,
      description: PASTEIS_PROMO_SABORES.map(({ name }) => name).join(", ") + ".",
      categoryLabel: "Dupla de pastéis",
      badge: "2 unidades",
      availability: "Seg, ter e sex",
    }] : []),
    ...getCombos(now),
  ];
}
