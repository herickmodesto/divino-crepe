import { test } from "node:test";
import assert from "node:assert/strict";
import { CONFIG } from "../src/data/config.js";
import { MENU, PIZZA_SABORES, PASTEIS_SABORES } from "../src/data/menu.js";
import { PIZZA_PROMOTION, PIZZA_PROMO_SABORES, PASTEIS_PROMOTION, isPasteisPromotionActive, isPromotionDay, getPizzaPrice } from "../src/data/promotions.js";
import { getItemTotal } from "../src/utils/cart.js";

test("the five advertised pizzas have the same price on the homepage, menu and flavor selector", () => {
  assert.equal(PIZZA_PROMOTION.price, "24,99");
  assert.equal(PIZZA_PROMO_SABORES.length, 5);
  for (const { name } of PIZZA_PROMO_SABORES) {
    const item = MENU.Pizzas.find((pizza) => pizza.name === name);
    assert.equal(item.price, getPizzaPrice(), name);
    assert.equal(item.promo, isPromotionDay(), name);
    assert.equal(PIZZA_SABORES.find((pizza) => pizza.name === name).price, item.price, name);
    assert.equal(getItemTotal({ ...item, qty: 2 }), Math.round(item.price * 100) * 2 / 100, name);
  }
  assert.equal(MENU.Pizzas.find((pizza) => pizza.name === "Mussarela").price, 28);
});

test("the pastel offer charges 15.99 per pair and uses the five advertised flavors", () => {
  assert.equal(PASTEIS_PROMOTION.price, "15,99");
  assert.equal(CONFIG.pasteisPromoPrice, 15.99);
  assert.deepEqual(PASTEIS_SABORES.map((flavor) => flavor.name), [
    "Calabresa", "Queijo e Presunto", "Frango com Catupiry", "Frango com Cheddar", "Chocolate",
  ]);
  assert.equal(getItemTotal({ price: CONFIG.pasteisPromoPrice, qty: 2 }), 31.98);
  assert.equal(MENU["Pastéis Grandes"].find((item) => item.name === "Queijo e Presunto").price, 10);
});

test("pastel offer remains available on subsequent days", () => {
  assert.equal(isPasteisPromotionActive(new Date("2026-10-06T03:00:00Z")), true);
  assert.equal(isPasteisPromotionActive(new Date("2026-11-02T03:00:00Z")), true);
  const pair = MENU["Pastéis Grandes"].find((item) => item.itemType === "pasteis");
  assert.equal(Boolean(pair), isPasteisPromotionActive());
  if (pair) assert.equal(pair.price, 15.99);
  assert.equal(PASTEIS_PROMOTION.description.includes("somente hoje"), false);
});

test("optional expiry dates use midnight in Fortaleza, not UTC", () => {
  assert.equal(isPasteisPromotionActive(new Date("2026-10-06T02:59:59Z"), "2026-10-05"), true);
  assert.equal(isPasteisPromotionActive(new Date("2026-10-06T03:00:00Z"), "2026-10-05"), false);
});

test("offers apply on Monday, Tuesday and Friday, excluding closed days and weekends", () => {
  for (let day = 5; day <= 11; day++) {
    const date = new Date(`2026-10-${String(day).padStart(2, "0")}T18:00:00-03:00`);
    const active = [5, 6, 9].includes(day);
    assert.equal(isPromotionDay(date), active, `October ${day}`);
    assert.equal(isPasteisPromotionActive(date), active, `October ${day}`);
    assert.equal(getPizzaPrice(date), active ? 24.99 : 28, `October ${day}`);
  }
  assert.equal(isPromotionDay(new Date("2026-10-10T02:59:59Z")), true);
  assert.equal(isPromotionDay(new Date("2026-10-10T03:00:00Z")), false);
});
