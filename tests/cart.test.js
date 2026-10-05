import { test } from "node:test";
import assert from "node:assert/strict";
import { getUnitPrice, getItemTotal, getSubtotal, getDeliveryFee, getPizzaDescription } from "../src/utils/cart.js";

test("pizza borders are included in unit and quantity totals", () => {
  const item = { price: 24, qty: 2, selectedAddons: [{ name: "Catupiry", price: 5 }] };
  assert.equal(getUnitPrice(item), 29);
  assert.equal(getItemTotal(item), 58);
  assert.equal(getSubtotal([item]), 58);
});

test("açaí complements and combo borders are not charged twice", () => {
  const acai = { price: 19, qty: 2, extraPrice: 4, selectedComplementos: [{ name: "Leite" }] };
  const combo = { price: 60, qty: 1, comboAddons: { borda1: { price: 5 } } };
  assert.equal(getItemTotal(acai), 38);
  assert.equal(getSubtotal([acai, combo]), 98);
});

test("unknown prices remain unknown and do not contaminate subtotal", () => {
  const item = { price: null, qty: 3, selectedAddons: [{ price: 5 }] };
  assert.equal(getUnitPrice(item), null);
  assert.equal(getItemTotal(item), null);
  assert.equal(getSubtotal([item, { price: 24, qty: 1 }]), 24);
  assert.equal(getSubtotal([]), 0);
});

test("money calculations round to cents", () => {
  assert.equal(getSubtotal([{ price: 0.1, qty: 3 }, { price: 0.2, qty: 1 }]), 0.5);
  assert.equal(getItemTotal({ price: 25.9, qty: 3 }), 77.7);
});

test("pickup ignores stale delivery fee and malformed fees are rejected", () => {
  assert.equal(getDeliveryFee({ deliveryType: "pickup", fee: "8,50" }), 0);
  assert.equal(getDeliveryFee({ deliveryType: "delivery", fee: "8,50" }), 8.5);
  for (const fee of ["", "invalid", "Infinity", "-5"]) {
    assert.equal(getDeliveryFee({ fee }), 0);
  }
});

test("WhatsApp includes pizza flavor even when no border was selected", () => {
  assert.equal(getPizzaDescription({ selectedSabor: { name: "Calabresa" } }), " [Sabor: Calabresa]");
  assert.equal(getPizzaDescription({ selectedAddons: [{ name: "Catupiry" }], selectedSabor: { name: "Frango" }, saborMeio: { name: "Queijo" } }), " [Catupiry, Sabor: Frango, Meia Queijo]");
  assert.equal(getPizzaDescription({}), "");
});
