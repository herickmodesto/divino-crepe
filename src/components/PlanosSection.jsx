const PLANOS = [
  {
    id: 1,
    titulo: "Básico",
    preco: "24",
    info: "Perfeito para quem quer aproveitar nossa promoção diária de pizza.",
    itens: [
      "1 Pizza Grande",
      "Sabores da promoção",
      "Meia a meia disponível",
    ],
  },
  {
    id: 2,
    titulo: "Especial",
    preco: "49",
    info: "Ideal para casais ou quem quer variar com pizza e crepes.",
    itens: [
      "2 Pizzas Grandes",
      "Refrigerante 1L incluso",
      "Meia a meia disponível",
      "Sabores à escolha",
    ],
    destaque: true,
  },
  {
    id: 3,
    titulo: "Família",
    preco: "79",
    info: "O combo completo para toda a família curtir junto.",
    itens: [
      "2 Pizzas Grandes",
      "3 Crepes Suíços",
      "Refrigerante 2L incluso",
      "Meia a meia disponível",
      "Sabores à escolha",
    ],
  },
];

const CheckIcon = () => (
  <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none" />
    <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" />
  </svg>
);

export default function PlanosSection({ onOrderClick }) {
  return (
    <div className="planos-page">
      <div className="planos-header">
        <h1 className="planos-title">Nossos Combos</h1>
        <p className="planos-subtitle">Escolha o combo ideal para você e aproveite nossas promoções.</p>
      </div>

      <div className="planos-grid">
        {PLANOS.map((plano) => (
          <div key={plano.id} className={`plan${plano.destaque ? " plan--destaque" : ""}`}>
            <div className="inner">
              <span className="pricing">
                <span>
                  R$ {plano.preco} <small>/ combo</small>
                </span>
              </span>
              <p className="title">{plano.titulo}</p>
              <p className="info">{plano.info}</p>
              <ul className="features">
                {plano.itens.map((item) => (
                  <li key={item}>
                    <span className="icon"><CheckIcon /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="action">
                <button className="button" onClick={onOrderClick}>
                  Fazer Pedido
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
