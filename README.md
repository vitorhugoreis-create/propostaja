# PropostaJá

Gera propostas comerciais profissionais em português (pt-PT) em segundos.

Stack: **Vite + React + TypeScript + Tailwind CSS**.

## Funcionalidades

- Landing page (hero, como funciona, preços, CTA)
- Gerador de propostas (cliente, serviço, escopo, prazo, preço EUR, tom formal/casual)
- Copiar para a área de transferência e descarregar `.txt`
- Plano Free: 3 gerações/mês (controlo em `localStorage`)
- Plano Pro 9,90€/mês — UI apenas; integração Stripe marcada como TODO

## Começar

```bash
cd propostaja
npm install
npm run dev
```

Abre a URL indicada pelo Vite (normalmente http://localhost:5173).

## Scripts

| Comando           | Descrição                          |
|-------------------|------------------------------------|
| `npm run dev`     | Servidor de desenvolvimento        |
| `npm run build`   | Build de produção (`dist/`)        |
| `npm run preview` | Pré-visualizar o build             |
| `npm run lint`    | Lint com oxlint                    |

## Estrutura principal

```
src/
  App.tsx                 # Navegação landing ↔ gerador
  components/
    Header.tsx
    Landing.tsx           # Hero, como funciona, preços, CTA
    Generator.tsx         # Formulário + resultado
    Footer.tsx
  lib/
    generate.ts           # Geração do texto da proposta
    storage.ts            # Limite Free (localStorage)
  index.css               # Tailwind
```

## Nota sobre pagamentos

O botão Pro está desativado de propósito. A integração com Stripe ainda não está implementada (TODO).
