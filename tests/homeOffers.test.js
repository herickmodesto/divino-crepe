import test from "node:test";
import assert from "node:assert/strict";
import { getHomeOffers } from "../src/data/homeOffers.js";
import { PIZZA_PROMO_SABORES, PASTEIS_PROMO_SABORES } from "../src/data/promotions.js";
import { COMBO_PIZZA_SABORES } from "../src/data/comboFlavors.js";

test("two-pizza combo includes exactly the nine approved flavors, without standalone prices", () => {
  assert.deepEqual(COMBO_PIZZA_SABORES.map(({ name }) => name), [
    "Calabresa", "Mussarela", "Marguerita", "Frango com Cheddar",
    "Frango com Catupiry", "Mista", "Pepperoni com Cheddar", "Chocolate", "Brigadeiro",
  ]);
  assert.ok(COMBO_PIZZA_SABORES.every((flavor) => !("price" in flavor)));
  for (const day of ["2026-10-05", "2026-10-10"]) {
    const combo = getHomeOffers(new Date(`${day}T18:00:00-03:00`)).find(({ id }) => id === 3);
    assert.deepEqual(combo.pizzaSabores, COMBO_PIZZA_SABORES);
    assert.ok(combo.description.includes("9 sabores"));
  }
});

test("home offers preserve promotional prices, quantities and flavor selection", () => {
  const offers = getHomeOffers(new Date("2026-10-05T18:00:00-03:00"));
  assert.deepEqual(offers.map(({ id, price, itemType }) => [id, price, itemType]), [
    [1, "24,99", "pizza"],
    [2, "15,99", "pasteis"],
    [3, "58,90", "combo"],
    [7, "18,99", "pasteis"],
    [5, "14,99", "crepe"],
    [6, "73,90", "combo"],
  ]);
  assert.deepEqual(offers[0].pizzaSabores, PIZZA_PROMO_SABORES);
  for (const flavor of PASTEIS_PROMO_SABORES) {
    assert.ok(offers[1].description.includes(flavor.name));
  }
  assert.ok(offers.every(({ description }) => !description.includes("Fechamos")));
});

test("closed weekdays do not advertise day-only offers", () => {
  for (const date of ["2026-10-07", "2026-10-08"]) {
    assert.deepEqual(getHomeOffers(new Date(`${date}T18:00:00-03:00`)).map(({ id }) => id), [3, 7, 5, 6]);
  }
});

test("weekend combo pricing follows Fortaleza, not the visitor timezone", () => {
  // Saturday in UTC is still Friday in Fortaleza.
  const friday = getHomeOffers(new Date("2026-10-10T01:00:00Z"));
  assert.equal(friday.find(({ id }) => id === 3).price, "58,90");
  assert.ok(friday.some(({ id }) => id === 1));
  const saturday = getHomeOffers(new Date("2026-10-10T18:00:00-03:00"));
  assert.equal(saturday.find(({ id }) => id === 3).price, "62,90");
  assert.ok(!saturday.some(({ id }) => id === 1 || id === 2));
});
