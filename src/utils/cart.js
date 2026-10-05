// Açaí and combos already store their extras in price. Pizza borders are separate.
export function getUnitPrice(item) {
  if (item.price == null) return null;
  const addons = (item.selectedAddons || []).reduce(
    (sum, addon) => sum + Math.round((addon.price || 0) * 100), 0
  );
  return (Math.round(item.price * 100) + addons) / 100;
}

export function getItemTotal(item) {
  const unitPrice = getUnitPrice(item);
  return unitPrice == null ? null : Math.round(unitPrice * 100) * item.qty / 100;
}

export function getSubtotal(cart) {
  return cart.reduce((sum, item) => sum + Math.round((getItemTotal(item) || 0) * 100), 0) / 100;
}

export function getDeliveryFee(form) {
  if (form.deliveryType === "pickup") return 0;
  const fee = Number(String(form.fee || "0").replace(",", "."));
  return Number.isFinite(fee) && fee > 0 ? Math.round(fee * 100) / 100 : 0;
}

export function getPizzaDescription(item) {
  const parts = (item.selectedAddons || []).map((addon) => addon.name);
  if (item.selectedSabor) parts.push(`Sabor: ${item.selectedSabor.name}`);
  if (item.saborMeio) parts.push(`Meia ${item.saborMeio.name}`);
  return parts.length ? ` [${parts.join(", ")}]` : "";
}
