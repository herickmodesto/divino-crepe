import { CONFIG } from "./config.js";
import { COMBO_PIZZA_SABORES, COMBO_PREMIUM_PIZZA_SABORES, COMBO_PASTEIS_SABORES, COMBO_CREPE_SABORES } from "./comboFlavors.js";

const priceLabel = (price) => price.toFixed(2).replace(".", ",");

export function getCombos(now = new Date()) {
  const weekday = new Intl.DateTimeFormat("en-US", { timeZone: "America/Fortaleza", weekday: "short" }).format(now);
  const isWeekend = weekday === "Sat" || weekday === "Sun";
  return [
    {
      id: 3,
      title: "Combo de Pizzas",
      description: `2 pizzas grandes + refrigerante de 1L. ${COMBO_PIZZA_SABORES.length} sabores à sua escolha.`,
      price: priceLabel(isWeekend ? CONFIG.comboPizzaWeekendPrice : CONFIG.comboPizzaWeekdayPrice),
      image: "/images/pizzas/real/marguerita.jpg",
      itemType: "combo",
      pizzaSabores: COMBO_PIZZA_SABORES,
      categoryLabel: isWeekend ? "Preço de fim de semana" : "Preço de segunda a sexta",
      badge: "2 pizzas + refri",
      featured: true,
    },
    {
      id: 7,
      title: "Combo de Pastéis",
      description: "2 pastéis grandes. Queijo Coalho, Queijo e Presunto, Frango com Cheddar, Frango com Catupiry ou Chocolate.",
      price: priceLabel(CONFIG.comboPasteisPrice),
      image: "/images/pasteis/pasteis.webp",
      itemType: "pasteis",
      pasteisSabores: COMBO_PASTEIS_SABORES,
      categoryLabel: "Dupla de pastéis",
      badge: "2 unidades",
    },
    {
      id: 5,
      title: "Trio de Crepes",
      description: "3 crepes suíços de qualquer sabor. Combine seus favoritos entre as opções salgadas e doces.",
      price: priceLabel(CONFIG.comboCrepesPrice),
      image: "/images/crepes/crepechocolate.webp",
      itemType: "crepe",
      crepeSabores: COMBO_CREPE_SABORES,
      categoryLabel: "Monte seu trio",
      badge: "3 unidades",
    },
    {
      id: 6,
      title: "Combo Pizza Premium",
      description: "2 pizzas grandes + refrigerante de 1L. Escolha entre 12 sabores, incluindo Portuguesa, Banana Nevada, Lombo e Frango com Bacon.",
      price: priceLabel(CONFIG.comboPizzaPremiumPrice),
      image: "/images/pizzas/real/mussarela.jpg",
      itemType: "combo",
      pizzaSabores: COMBO_PREMIUM_PIZZA_SABORES,
      categoryLabel: "Sabores premium",
      badge: "2 pizzas + refri",
    },
  ];
}
