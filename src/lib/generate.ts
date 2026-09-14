export type Tone = 'formal' | 'casual'

export type ProposalInput = {
  cliente: string
  servico: string
  escopo: string
  prazo: string
  preco: string
  tom: Tone
}

function formatEuro(value: string): string {
  const cleaned = value.replace(/\s/g, '').replace(',', '.')
  const num = Number(cleaned)
  if (!Number.isFinite(num)) return value.trim() || '—'
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(num)
}

function todayPt(): string {
  return new Intl.DateTimeFormat('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())
}

export function generateProposal(input: ProposalInput): string {
  const cliente = input.cliente.trim() || 'Cliente'
  const servico = input.servico.trim() || 'serviço profissional'
  const escopo = input.escopo.trim() || 'conforme conversado'
  const prazo = input.prazo.trim() || 'a combinar'
  const precoFmt = formatEuro(input.preco)
  const data = todayPt()

  if (input.tom === 'casual') {
    return `Proposta comercial — ${servico}
Data: ${data}

Olá ${cliente},

Obrigado pelo interesse. Segue uma proposta clara e direta para ${servico}.

O que está incluído
${escopo}

Prazo estimado
${prazo}

Investimento
${precoFmt} (IVA não incluído, salvo indicação em contrário)

Como avançamos
1. Confirma se isto faz sentido para ti.
2. Ajustamos detalhes se precisares.
3. Definimos o arranque e o calendário.

Esta proposta é válida por 15 dias. Qualquer dúvida, responde a este email — estou disponível para esclarecer.

Cumprimentos`
  }

  return `PROPOSTA COMERCIAL
${servico}
Data: ${data}

Exmo(a). Sr(a). ${cliente},

Agradecemos a oportunidade de apresentar esta proposta relativa a ${servico}.

1. Âmbito dos serviços
${escopo}

2. Prazo de execução
Prazo estimado: ${prazo}.
O calendário definitivo será confirmado aquando da aceitação desta proposta.

3. Condições comerciais
Valor total: ${precoFmt}
(IVA à taxa legal em vigor, salvo indicação em contrário.)

Condições de pagamento a acordar (ex.: 50% no arranque e 50% na entrega, ou conforme combinado por escrito).

4. Validade
A presente proposta é válida por 15 dias a contar da data acima indicada.

5. Aceitação
A aceitação poderá ser formalizada por resposta escrita a este documento ou por contrato específico a celebrar entre as partes.

Ficamos ao dispor para qualquer esclarecimento adicional.

Com os melhores cumprimentos`
}
