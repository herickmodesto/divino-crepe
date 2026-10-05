// Sabores inclusos na oferta de duas pizzas grandes + refrigerante.
// Não usam os preços das pizzas avulsas: o valor é o do combo.
export const COMBO_PIZZA_SABORES = [
  { name: "Calabresa", emoji: "🍕" },
  { name: "Mussarela", emoji: "🧀" },
  { name: "Marguerita", emoji: "🍅" },
  { name: "Frango com Cheddar", emoji: "🍗" },
  { name: "Frango com Catupiry", emoji: "🍗" },
  { name: "Mista", emoji: "🍕" },
  { name: "Pepperoni com Cheddar", emoji: "🍕" },
  { name: "Chocolate", emoji: "🍫" },
  { name: "Brigadeiro", emoji: "🍫" },
];

export const COMBO_PREMIUM_PIZZA_SABORES = [
  ...COMBO_PIZZA_SABORES.filter(({ name }) => name !== "Brigadeiro"),
  { name: "Portuguesa", emoji: "🥚" },
  { name: "Banana Nevada", emoji: "🍌" },
  { name: "Lombo", emoji: "🥓" },
  { name: "Frango com Bacon", emoji: "🥓" },
];

export const COMBO_PASTEIS_SABORES = [
  { name: "Queijo Coalho", emoji: "🧀" },
  { name: "Queijo e Presunto", emoji: "🧀" },
  { name: "Frango com Cheddar", emoji: "🍗" },
  { name: "Frango com Catupiry", emoji: "🍗" },
  { name: "Chocolate", emoji: "🍫" },
];

export const COMBO_CREPE_SABORES = [
  { name: "Carne de Sol com Nata", emoji: "🥩" },
  { name: "Frango com Catupiry", emoji: "🍗" },
  { name: "Frango com Cheddar", emoji: "🍗" },
  { name: "Frango com Bacon", emoji: "🥓" },
  { name: "Queijo e Presunto", emoji: "🧀" },
  { name: "Queijo e Calabresa", emoji: "🌶️" },
  { name: "Queijo Coalho", emoji: "🧀" },
  { name: "Camarão", emoji: "🦐" },
  { name: "Marguerita", emoji: "🍅" },
  { name: "Chocolate ao Leite", emoji: "🍫" },
  { name: "Batom (doce)", emoji: "🍬" },
  { name: "Nutella (doce)", emoji: "🌰" },
  { name: "Nutella com M&M", emoji: "🍬" },
  { name: "Nutella com Amendoim", emoji: "🥜" },
  { name: "Nutella com Morango", emoji: "🍓" },
  { name: "Kit Kat", emoji: "🍫" },
  { name: "Doce de Leite", emoji: "🍯" },
  { name: "Romeu e Julieta (doce)", emoji: "🧀" },
  { name: "Prestígio", emoji: "🥥" },
];
