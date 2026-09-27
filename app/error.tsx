'use client'

import { useEffect } from 'react'

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[Locat] Page rendering failed', { digest: GlobalError.name })
  }, [])

  return (
    <main className="main error-state" role="alert">
      <p className="eyebrow">LOCAT AI</p>
      <h1>Cette page n’a pas pu être affichée.</h1>
      <p>Vos données sauvegardées sont conservées. Réessayez ou revenez au tableau de bord.</p>
      <button className="primary" onClick={() => reset()}>Réessayer</button>
    </main>
  )
}
