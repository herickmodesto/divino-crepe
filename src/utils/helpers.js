export const money = (v) =>
  v == null
    ? null
    : v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
