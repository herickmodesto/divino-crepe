import test from "node:test";
import assert from "node:assert/strict";
import { PIZZA_CATALOG, PIZZA_PRICES } from "../src/data/pizzaCatalog.js";
import { MENU, PIZZA_SABORES, ADDONS } from "../src/data/menu.js";
import { getPizzaPrice } from "../src/data/promotions.js";
import { getCombos } from "../src/data/combos.js";
import { COMBO_PREMIUM_PIZZA_SABORES, COMBO_PASTEIS_SABORES, COMBO_CREPE_SABORES } from "../src/data/comboFlavors.js";
import { getItemTotal } from "../src/utils/cart.js";

const expectedPrices = {
  "Mussarela": 28, "Calabresa": 28, "Frango com Cheddar": 28,
  "Frango com Catupiry": 31, "Sertanejo": 42, "Carne de Sol com Nata": 42,
  "Portuguesa": 31, "Marguerita": 28, "Bacon": 29.99,
  "Pepperoni com Cheddar": 28, "Camarão": 47, "Camarão Internacional": 55,
  "Lombo": 29.99, "Caipira": 34, "Mista": 28, "Churros": 28,
  "Chocolate": 28, "Chocolate com Banana": 32, "Chocolate com M&M": 32,
  "Chocolate com Morango": 29.99, "Banana Nevada": 31, "Kit Kat": 31,
  "Chocolate Branco com Ovomaltine": 32, "Prestígio": 30,
};

test("all 24 regular pizza prices match the PDF, including the revised Caipira price", () => {
  assert.deepEqual(PIZZA_PRICES, expectedPrices);
  assert.equal(Object.values(PIZZA_CATALOG).flat().length, 24);
  const saturday = new Date("2026-10-10T18:00:00-03:00");
  for (const [name, price] of Object.entries(expectedPrices)) {
    assert.equal(getPizzaPrice(saturday, name), price, name);
  }
});

test("all pizza menu items and standalone flavor selectors share the same price source", () => {
  const pizzas = Object.keys(PIZZA_CATALOG).flatMap(category => MENU[category]);
  assert.equal(pizzas.length, 24);
  assert.equal(new Set(pizzas.map(({ name }) => name)).size, 24);
  for (const pizza of pizzas) {
    assert.equal(pizza.price, getPizzaPrice(new Date(), pizza.name), pizza.name);
    assert.equal(PIZZA_SABORES.find(({ name }) => name === pizza.name).price, pizza.price, pizza.name);
  }
});

test("pizza borders match the PDF and charge correctly for two units", () => {
  assert.deepEqual(ADDONS.map(({ name, price }) => [name, price]), [
    ["Sem Borda", 0], ["Cheddar", 7], ["Catupiry", 7], ["Chocolate", 10],
  ]);
  assert.equal(getItemTotal({ price: 28, selectedAddons: [ADDONS[1]], qty: 2 }), 70);
});

test("the four new combos have the documented prices and their own inclusive flavor lists", () => {
  for (const [day, pizzaPrice] of [["2026-10-05", "58,90"], ["2026-10-10", "62,90"]]) {
    const combos = getCombos(new Date(`${day}T18:00:00-03:00`));
    assert.deepEqual(combos.map(({ price }) => price), [pizzaPrice, "18,99", "14,99", "73,90"]);
    assert.equal(new Set(combos.map(({ id }) => id)).size, 4);
    assert.deepEqual(combos[1].pasteisSabores, COMBO_PASTEIS_SABORES);
    assert.deepEqual(combos[2].crepeSabores, COMBO_CREPE_SABORES);
    assert.deepEqual(combos[3].pizzaSabores, COMBO_PREMIUM_PIZZA_SABORES);
  }
  assert.equal(COMBO_PREMIUM_PIZZA_SABORES.length, 12);
  assert.equal(COMBO_PASTEIS_SABORES.length, 5);
  assert.equal(COMBO_CREPE_SABORES.length, 19);
  assert.ok(COMBO_PREMIUM_PIZZA_SABORES.some(({ name }) => name === "Frango com Bacon"));
  assert.ok(COMBO_PREMIUM_PIZZA_SABORES.every(flavor => !("price" in flavor)));
});
