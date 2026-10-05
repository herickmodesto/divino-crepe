const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency", currency: "BRL",
});

export const money = (value) => value == null ? null : currencyFormatter.format(value);
