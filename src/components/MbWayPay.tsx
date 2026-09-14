import { useState, type FormEvent } from 'react'
import { activatePro, isPro } from '../lib/storage'
import {
  MBWAY_PHONE_DIGITS,
  MBWAY_PHONE_DISPLAY,
  PRO_PRICE_LABEL,
  WHATSAPP_URL,
} from '../lib/payments'

type MbWayPayProps = {
  onActivated?: () => void
  compact?: boolean
}

export function MbWayPay({ onActivated, compact }: MbWayPayProps) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [unlocked, setUnlocked] = useState(isPro())

  async function handleCopyPhone() {
    try {
      await navigator.clipboard.writeText(MBWAY_PHONE_DIGITS)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  function handleActivate(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (activatePro(code)) {
      setUnlocked(true)
      setCode('')
      onActivated?.()
    } else {
      setError('Código inválido. Confirma o pagamento e o código que recebeste.')
    }
  }

  if (unlocked) {
    return (
      <div
        className={`rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 ${
          compact ? '' : ''
        }`}
      >
        <p className="font-semibold">Pro desbloqueado ✓</p>
        <p className="mt-1 text-sm">
          Tens propostas ilimitadas neste dispositivo. Obrigado pelo apoio!
        </p>
      </div>
    )
  }

  return (
    <div
      className={`rounded-xl border border-brand-200 bg-brand-50/60 p-4 text-ink ${
        compact ? 'space-y-3' : 'space-y-4'
      }`}
    >
      <div>
        <p className="font-semibold text-ink">Ativar PropostaJá Pro</p>
        <p className="mt-1 text-sm text-muted">
          Enviar {PRO_PRICE_LABEL} por MB Way para{' '}
          <strong className="text-ink">{MBWAY_PHONE_DISPLAY}</strong>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleCopyPhone}
          className="rounded-lg border border-border bg-white px-3 py-2 text-xs font-medium text-ink hover:bg-surface"
        >
          {copied ? 'Copiado!' : 'Copiar número'}
        </button>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-[#25D366] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1ebe57]"
        >
          Já paguei — pedir ativação
        </a>
      </div>

      <form onSubmit={handleActivate} className="space-y-2">
        <label htmlFor="pro-code" className="block text-xs font-medium text-muted">
          Depois de confirmares o pagamento, introduz o código de ativação:
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="pro-code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value)
              setError('')
            }}
            placeholder="Código de ativação"
            className="flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="submit"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Ativar com código
          </button>
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </form>
    </div>
  )
}
