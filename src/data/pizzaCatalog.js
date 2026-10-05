// Preços avulsos conferidos no DIVINO CREPE CARDÁPIO.pdf.
// A página corrigida do PDF traz a Caipira por R$ 34,00.
export const PIZZA_CATALOG = {
  "Pizzas": [
    { name: "Calabresa", price: 28, desc: "Molho de tomate, mussarela, calabresa, cebola e orégano.", emoji: "🍕", image: "/images/pizzas/calabresa.webp" },
    { name: "Mussarela", price: 28, desc: "Molho de tomate, mussarela e orégano.", emoji: "🧀", image: "/images/pizzas/real/mussarela.jpg" },
    { name: "Frango com Cheddar", price: 28, desc: "Molho de tomate, mussarela, frango desfiado, cheddar e orégano.", emoji: "🍗", image: "/images/pizzas/sheddar.webp" },
    { name: "Chocolate", price: 28, desc: "Creme de leite e chocolate ao leite.", emoji: "🍫", image: "/images/pizzas/chocolate.webp" },
    { name: "Portuguesa", price: 31, desc: "Molho de tomate, presunto ralado, mussarela, ovo cozido, milho, ervilha, cebola e orégano.", emoji: "🥚", image: "/images/pizzas/portuguesa.webp" },
    { name: "Marguerita", price: 28, desc: "Molho de tomate, mussarela, tomate em rodelas, orégano e manjericão fresco.", emoji: "🍅", image: "/images/pizzas/real/marguerita.jpg" },
    { name: "Sertanejo", price: 42, desc: "Molho de tomate, carne de sol desfiada, mussarela, cebola, queijo coalho e orégano.", emoji: "🥩", image: "/images/pizzas/sertanejo.webp" },
    { name: "Pepperoni com Cheddar", price: 28, desc: "Molho de tomate, mussarela, pepperoni, cheddar e orégano.", emoji: "🍕" },
    { name: "Bacon", price: 29.99, desc: "Molho de tomate, mussarela, bacon frito e orégano.", emoji: "🥓", image: "/images/pizzas/real/bacon.jpg", imagePosition: "center 70%" },
    { name: "Caipira", price: 34, desc: "Molho de tomate, mussarela, frango desfiado, bacon, milho, cheddar e orégano.", emoji: "🍗" },
    { name: "Mista", price: 28, desc: "Molho de tomate, presunto, mussarela, tomate e orégano.", emoji: "🍕" },
  ],
  "Pizzas Premium": [
    { name: "Lombo", price: 29.99, desc: "Molho de tomate, mussarela, lombo canadense, catupiry e orégano.", emoji: "🥓", image: "/images/pizzas/lombo.webp" },
    { name: "Frango com Catupiry", price: 31, desc: "Molho de tomate, frango desfiado, mussarela, catupiry e orégano.", emoji: "🍗", image: "/images/pizzas/Frango_com_Catupiry.webp" },
    { name: "Camarão Internacional", price: 55, desc: "Molho de tomate, mussarela, presunto, camarão, milho, ervilha, batata palha e orégano.", emoji: "🦐", image: "/images/pizzas/Camarão_Internacional.webp" },
    { name: "Carne de Sol com Nata", price: 42, desc: "Molho de tomate, mussarela, creme de carne de sol na nata e queijo coalho.", emoji: "🥩", image: "/images/pizzas/Carne_de_Sol_com_Nata.webp" },
    { name: "Camarão", price: 47, desc: "Molho de tomate, mussarela, cebola, camarão, catupiry e orégano.", emoji: "🦐" },
  ],
  "Doces Premium": [
    { name: "Chocolate com Banana", price: 32, desc: "Creme de leite, mussarela, banana e chocolate ao leite.", emoji: "🍌", image: "/images/pizzas/Chocolate_com_Banana.webp" },
    { name: "Banana Nevada", price: 31, desc: "Creme de leite, mussarela, banana e chocolate branco granulado.", emoji: "🍌", image: "/images/pizzas/Banana_Nevada.webp" },
    { name: "Chocolate com M&M", price: 32, desc: "Creme de leite, mussarela, chocolate ao leite e M&M.", emoji: "🍬", image: "/images/pizzas/Chocolate_com_Confete.webp" },
    { name: "Chocolate com Morango", price: 29.99, desc: "Creme de leite, mussarela, chocolate ao leite e morangos frescos.", emoji: "🍓" },
    { name: "Churros", price: 28, desc: "Creme de leite, mussarela, doce de leite e canela.", emoji: "🍯" },
    { name: "Kit Kat", price: 31, desc: "Creme de leite, chocolate ao leite e Kit Kat em pedaços.", emoji: "🍫" },
    { name: "Chocolate Branco com Ovomaltine", price: 32, desc: "Creme de leite, mussarela, chocolate branco e Ovomaltine.", emoji: "🍫" },
    { name: "Prestígio", price: 30, desc: "Creme de leite, mussarela, chocolate ao leite e coco ralado.", emoji: "🥥" },
  ],
};

export const PIZZA_PRICES = Object.fromEntries(
  Object.values(PIZZA_CATALOG).flat().map(({ name, price }) => [name, price])
);
