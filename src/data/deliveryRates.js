// Tabela de taxas de entrega por bairro
export const DELIVERY_RATES = [
  { neighborhood: "Nova descoberta", rate: 3.00 },
  { neighborhood: "Potilandia", rate: 3.00 },
  { neighborhood: "Morro branco", rate: 4.00 },
  { neighborhood: "Lagoa nova", rate: 4.00 },
  { neighborhood: "Mirassol", rate: 5.00 },
  { neighborhood: "Lagoa seca", rate: 6.00 },
  { neighborhood: "Tirol", rate: 6.00 },
  { neighborhood: "Capim Macio", rate: 6.00 },
  { neighborhood: "Cidade da esperança", rate: 8.00 },
  { neighborhood: "Dix Sept Rosado", rate: 8.00 },
  { neighborhood: "Nossa senhora de Nazaré", rate: 8.00 },
  { neighborhood: "Alecrim", rate: 8.00 },
  { neighborhood: "Cidade Alta", rate: 9.00 },
  { neighborhood: "Neópolis", rate: 9.00 },
  { neighborhood: "Petrópolis", rate: 9.00 },
  { neighborhood: "Pitimbu", rate: 9.00 },
  { neighborhood: "Ponta negra", rate: 10.00 },
  { neighborhood: "Nova Parnamirim", rate: 12.00 },
];

// Função para buscar taxa de entrega por bairro
export function getDeliveryRate(neighborhood) {
  const found = DELIVERY_RATES.find(
    (item) => item.neighborhood.toLowerCase() === neighborhood.toLowerCase()
  );
  return found ? found.rate : null;
}

// Função para listar todos os bairros disponíveis
export function getAvailableNeighborhoods() {
  return DELIVERY_RATES.map((item) => item.neighborhood).sort();
}

// Função para buscar a faixa de preço
export function getDeliveryRateRange() {
  const rates = DELIVERY_RATES.map((item) => item.rate);
  return {
    min: Math.min(...rates),
    max: Math.max(...rates),
  };
}