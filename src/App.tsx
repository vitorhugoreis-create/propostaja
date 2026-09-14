import { useCallback, useState } from 'react'
import { Header } from './components/Header'
import { Landing } from './components/Landing'
import { Generator } from './components/Generator'
import { Footer } from './components/Footer'
import { isPro, remainingFree } from './lib/storage'

type View = 'landing' | 'generator'

export default function App() {
  const [view, setView] = useState<View>('landing')
  const [remaining, setRemaining] = useState(remainingFree())
  const [pro, setPro] = useState(isPro())

  const refreshUsage = useCallback(() => {
    const unlocked = isPro()
    setPro(unlocked)
    setRemaining(remainingFree())
  }, [])

  function navigate(next: View) {
    setView(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex min-h-svh flex-col">
      <Header onNavigate={navigate} remaining={remaining} isPro={pro} />
      <main className="flex-1">
        {view === 'landing' ? (
          <Landing
            onStart={() => navigate('generator')}
            onProActivated={refreshUsage}
          />
        ) : (
          <Generator onUsageChange={refreshUsage} />
        )}
      </main>
      <Footer />
    </div>
  )
}
