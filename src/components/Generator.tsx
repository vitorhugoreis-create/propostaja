import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import {
  FREE_LIMIT,
  canGenerate,
  recordGeneration,
  remainingFree,
} from '../lib/storage'
import { generateProposal, type Tone } from '../lib/generate'

type GeneratorProps = {
  onUsageChange: () => void
}

export function Generator({ onUsageChange }: GeneratorProps) {
  const [cliente, setCliente] = useState('')
  const [servico, setServico] = useState('')
  const [escopo, setEscopo] = useState('')
  const [prazo, setPrazo] = useState('')
  const [preco, setPreco] = useState('')
  const [tom, setTom] = useState<Tone>('formal')
  const [proposta, setProposta] = useState('')
  const [copied, setCopied] = useState(false)
  const [blocked, setBlocked] = useState(!canGenerate())
  const [remaining, setRemaining] = useState(remainingFree())

  const canSubmit = useMemo(() => {
    return (
      !blocked &&
      Boolean(cliente.trim()) &&
      Boolean(servico.trim()) &&
      Boolean(escopo.trim()) &&
      Boolean(prazo.trim()) &&
      Boolean(preco.trim())
    )
  }, [blocked, cliente, servico, escopo, prazo, preco])

  function handleGenerate(e: FormEvent) {
    e.preventDefault()
    if (!canGenerate()) {
      setBlocked(true)
      setRemaining(0)
      return
    }
    const text = generateProposal({
      cliente,
      servico,
      escopo,
      prazo,
      preco,
      tom,
    })
    setProposta(text)
    recordGeneration()
    const left = remainingFree()
    setRemaining(left)
    setBlocked(left === 0)
    onUsageChange()
    setCopied(false)
  }

  async function handleCopy() {
    if (!proposta) return
    try {
      await navigator.clipboard.writeText(proposta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = proposta
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function handleDownload() {
    if (!proposta) return
    const blob = new Blob([proposta], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const safe = (servico || 'proposta')
      .toLowerCase()
      .replace(/[^a-z0-9à-ú]+/gi, '-')
      .replace(/^-|-$/g, '')
    a.download = `proposta-${safe || 'propostaja'}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ink">Gerar proposta</h1>
        <p className="mt-2 text-muted">
          Preenche os campos abaixo. Restam{' '}
          <strong className="text-ink">
            {remaining} de {FREE_LIMIT}
          </strong>{' '}
          gerações grátis este mês.
        </p>
      </div>

      {blocked && (
        <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
          <p className="font-semibold">Atingiste o limite do plano Free</p>
          <p className="mt-1 text-sm">
            Usaste as {FREE_LIMIT} propostas deste mês. O plano Pro (9,90€/mês)
            permitirá gerações ilimitadas — pagamentos com Stripe em breve
            (TODO).
          </p>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={handleGenerate} className="space-y-4">
          <Field label="Cliente" htmlFor="cliente">
            <input
              id="cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Ex.: Ana Silva / Empresa XYZ"
              className="w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={blocked}
              required
            />
          </Field>
          <Field label="Serviço" htmlFor="servico">
            <input
              id="servico"
              value={servico}
              onChange={(e) => setServico(e.target.value)}
              placeholder="Ex.: Redesign do site institucional"
              className="w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={blocked}
              required
            />
          </Field>
          <Field label="Escopo" htmlFor="escopo">
            <textarea
              id="escopo"
              value={escopo}
              onChange={(e) => setEscopo(e.target.value)}
              placeholder="O que está incluído (entregáveis, número de revisões, etc.)"
              className="min-h-28 w-full resize-y rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={blocked}
              required
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Prazo" htmlFor="prazo">
              <input
                id="prazo"
                value={prazo}
                onChange={(e) => setPrazo(e.target.value)}
                placeholder="Ex.: 3 semanas"
                className="w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={blocked}
                required
              />
            </Field>
            <Field label="Preço (EUR)" htmlFor="preco">
              <input
                id="preco"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                placeholder="Ex.: 1500 ou 1.500,00"
                className="w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 disabled:cursor-not-allowed disabled:opacity-60"
                inputMode="decimal"
                disabled={blocked}
                required
              />
            </Field>
          </div>
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-ink">Tom</legend>
            <div className="flex gap-3">
              {(
                [
                  { value: 'formal', label: 'Formal' },
                  { value: 'casual', label: 'Casual' },
                ] as const
              ).map((opt) => (
                <label
                  key={opt.value}
                  className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium ${
                    tom === opt.value
                      ? 'border-brand-600 bg-brand-50 text-brand-700'
                      : 'border-border text-muted hover:bg-surface'
                  } ${blocked ? 'pointer-events-none opacity-60' : ''}`}
                >
                  <input
                    type="radio"
                    name="tom"
                    value={opt.value}
                    checked={tom === opt.value}
                    onChange={() => setTom(opt.value)}
                    className="sr-only"
                    disabled={blocked}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Gerar proposta
          </button>
        </form>

        <div className="flex min-h-80 flex-col rounded-2xl border border-border bg-surface">
          <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
            <span className="text-sm font-medium text-ink">Resultado</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!proposta}
                className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-ink hover:bg-surface disabled:opacity-40"
              >
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!proposta}
                className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-ink hover:bg-surface disabled:opacity-40"
              >
                Descarregar .txt
              </button>
            </div>
          </div>
          <pre className="flex-1 overflow-auto whitespace-pre-wrap p-4 font-sans text-sm leading-relaxed text-ink">
            {proposta ||
              'A tua proposta aparecerá aqui após gerares. Podes copiá-la ou descarregá-la como ficheiro .txt.'}
          </pre>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
    </div>
  )
}
