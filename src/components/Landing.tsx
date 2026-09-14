import { useState } from 'react'
import { isPro } from '../lib/storage'
import { MbWayPay } from './MbWayPay'
import { PRO_PRICE_LABEL } from '../lib/payments'

type LandingProps = {
  onStart: () => void
  onProActivated?: () => void
}

export function Landing({ onStart, onProActivated }: LandingProps) {
  const [showPay, setShowPay] = useState(false)
  const [pro, setPro] = useState(isPro())

  function handleActivated() {
    setPro(true)
    onProActivated?.()
  }

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-brand-600">
            Para freelancers e pequenas empresas
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Propostas comerciais claras, em segundos
          </h1>
          <p className="mt-5 text-lg text-muted">
            Preenche o formulário, escolhe o tom e obtém um texto profissional
            em português — pronto a copiar ou descarregar. Sem promessas de
            faturação; só uma ferramenta para poupar tempo.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onStart}
              className="rounded-xl bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-brand-700"
            >
              Começar grátis
            </button>
            <a
              href="#como-funciona"
              className="rounded-xl border border-border px-6 py-3 text-base font-medium text-ink hover:bg-surface"
            >
              Ver como funciona
            </a>
          </div>
          <p className="mt-4 text-sm text-muted">
            3 propostas grátis por mês · Sem cartão de crédito
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="border-y border-border bg-surface py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">
            Como funciona
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-muted">
            Três passos simples. Sem contas complicadas.
          </p>
          <ol className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Preenche os dados',
                desc: 'Cliente, serviço, escopo, prazo e preço em euros.',
              },
              {
                step: '2',
                title: 'Escolhe o tom',
                desc: 'Formal para empresas, ou casual para contactos mais próximos.',
              },
              {
                step: '3',
                title: 'Copia ou descarrega',
                desc: 'Obténs um texto polido em pt-PT, pronto a enviar.',
              },
            ].map((item) => (
              <li
                key={item.step}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                  {item.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">
            Preços transparentes
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-muted">
            Começa grátis. Faz upgrade só se precisares de mais.
          </p>
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-ink">Free</h3>
              <p className="mt-2">
                <span className="text-3xl font-bold text-ink">0€</span>
                <span className="text-muted"> / mês</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>✓ 3 propostas por mês</li>
                <li>✓ Tom formal e casual</li>
                <li>✓ Copiar e descarregar .txt</li>
              </ul>
              <button
                type="button"
                onClick={onStart}
                className="mt-6 w-full rounded-xl border border-border py-2.5 text-sm font-semibold text-ink hover:bg-surface"
              >
                Usar grátis
              </button>
            </div>

            <div className="relative rounded-2xl border-2 border-brand-600 bg-white p-6 shadow-sm">
              <span className="absolute -top-3 left-4 rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-medium text-white">
                Recomendado
              </span>
              <h3 className="text-lg font-semibold text-ink">Pro</h3>
              <p className="mt-2">
                <span className="text-3xl font-bold text-ink">{PRO_PRICE_LABEL}</span>
                <span className="text-muted"> pagamento único</span>
              </p>
              <p className="mt-1 text-xs text-muted">via MB Way</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>✓ Propostas ilimitadas</li>
                <li>✓ Tudo do plano Free</li>
                <li>✓ Prioridade em novas funcionalidades</li>
              </ul>
              {pro ? (
                <div className="mt-6">
                  <MbWayPay onActivated={handleActivated} />
                </div>
              ) : showPay ? (
                <div className="mt-6">
                  <MbWayPay onActivated={handleActivated} />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPay(true)}
                  className="mt-6 w-full rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  Ativar Pro via MB Way
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-brand-800 py-14 text-white">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Pronto para a próxima proposta?
          </h2>
          <p className="mt-3 text-brand-100">
            Poupa tempo na redação. O resto — fechar o negócio — continua a
            depender de ti.
          </p>
          <button
            type="button"
            onClick={onStart}
            className="mt-6 rounded-xl bg-white px-6 py-3 text-base font-semibold text-brand-800 hover:bg-brand-50"
          >
            Gerar a minha proposta
          </button>
        </div>
      </section>
    </div>
  )
}
