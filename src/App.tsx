import { useCallback, useState } from 'react'
import { Header } from './components/Header'
import { Landing } from './components/Landing'
import { Generator } from './components/Generator'
import { Footer } from './components/Footer'
import { remainingFree } from './lib/storage'

type View = 'landing' | 'generator'

export default function App() {
  const [view, setView] = useState<View>('landing')
  const [remaining, setRemaining] = useState(remainingFree())

  const refreshUsage = useCallback(() => {
    setRemaining(remainingFree())
  }, [])

  function navigate(next: View) {
    setView(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex min-h-svh flex-col">
      <Header onNavigate={navigate} remaining={remaining} />
      <main className="flex-1">
        {view === 'landing' ? (
          <Landing onStart={() => navigate('generator')} />
        ) : (
          <Generator onUsageChange={refreshUsage} />
        )}
      </main>
      <Footer />
    </div>
  )
}
