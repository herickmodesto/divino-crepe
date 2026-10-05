import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { PIZZA_CATALOG } from "../src/data/pizzaCatalog.js";
import { getCombos } from "../src/data/combos.js";

test("fotos reais selecionadas existem localmente e acompanham os sabores corretos", () => {
  const pizzas = Object.values(PIZZA_CATALOG).flat();
  for (const name of ["Marguerita", "Mussarela", "Bacon"]) {
    const item = pizzas.find((pizza) => pizza.name === name);
    assert.ok(item.image.startsWith("/images/pizzas/real/"));
    assert.ok(existsSync(new URL(`../public${item.image}`, import.meta.url)));
  }
});

test("combos de pizza utilizam fotos reais sem alterar sabores e preços", () => {
  for (const combo of getCombos().filter((item) => item.itemType === "combo")) {
    assert.ok(combo.image.startsWith("/images/pizzas/real/"));
    assert.ok(existsSync(new URL(`../public${combo.image}`, import.meta.url)));
  }
});
