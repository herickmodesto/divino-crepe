# 🔥 Divino Crepe – Site Delivery

Site de delivery com integração ao WhatsApp para o Divino Crepe.

## Stack

- **Vite** – Build tool ultrarrápido
- **React 19** – UI reativa com componentes modulares
- **CSS Puro** – Sem frameworks, design dark premium customizado
- **Plus Jakarta Sans + DM Serif Display** – Tipografia profissional

## Como rodar localmente

```bash
# 1. Instalar dependências
npm install

# 2. Rodar servidor de desenvolvimento
npm run dev

# 3. Abrir no navegador
# → http://localhost:5173
```

## Build para produção

```bash
npm run build
```

Os arquivos finais estarão na pasta `dist/`.

## Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── CartPanel.jsx    # Carrinho + formulário + botão WhatsApp
│   ├── Header.jsx       # Header sticky com logo e ações
│   ├── Hero.jsx         # Banner hero com promoção
│   ├── Icons.jsx        # Ícones SVG (Search, WhatsApp)
│   ├── ItemCard.jsx     # Card de item do cardápio
│   ├── Toast.jsx        # Notificação toast
│   └── Toolbar.jsx      # Busca + filtros por categoria
├── data/
│   ├── config.js        # Dados da loja (nome, telefone, etc.)
│   └── menu.js          # Cardápio completo com preços
├── styles/
│   └── global.css       # Estilos globais
├── utils/
│   └── helpers.js       # Funções utilitárias (formatação de moeda)
├── App.jsx              # Componente principal
└── main.jsx             # Entry point
```

## Configuração

Edite `src/data/config.js` para alterar:
- Nome da loja
- Número do WhatsApp (formato E.164)
- Endereço
- Instagram
- Nota de promoção
- Horário de funcionamento

Edite `src/data/menu.js` para alterar o cardápio.

## Funcionalidades

- ✅ Cardápio completo com categorias
- ✅ Busca por nome, descrição ou categoria
- ✅ Carrinho com controle de quantidade
- ✅ Formulário de pedido (nome, endereço, pagamento, taxa, obs)
- ✅ Finalização via WhatsApp com mensagem formatada
- ✅ Itens sem preço marcados como "A consultar"
- ✅ Toast de confirmação
- ✅ Design responsivo (desktop + mobile)
- ✅ Bottom sheet do carrinho no mobile
- ✅ Animações e micro-interações
