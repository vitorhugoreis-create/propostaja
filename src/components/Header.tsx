type HeaderProps = {
  onNavigate: (view: 'landing' | 'generator') => void
  remaining: number
}

export function Header({ onNavigate, remaining }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2 font-semibold text-ink"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm text-white">
            PJ
          </span>
          <span>
            Proposta<span className="text-brand-600">Já</span>
          </span>
        </button>

        <nav className="flex items-center gap-2 sm:gap-4">
          <a
            href="#como-funciona"
            onClick={() => onNavigate('landing')}
            className="hidden text-sm text-muted hover:text-ink sm:inline"
          >
            Como funciona
          </a>
          <a
            href="#precos"
            onClick={() => onNavigate('landing')}
            className="hidden text-sm text-muted hover:text-ink sm:inline"
          >
            Preços
          </a>
          <span className="hidden text-xs text-muted sm:inline">
            Grátis: {remaining}/3 este mês
          </span>
          <button
            type="button"
            onClick={() => onNavigate('generator')}
            className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Gerar proposta
          </button>
        </nav>
      </div>
    </header>
  )
}
