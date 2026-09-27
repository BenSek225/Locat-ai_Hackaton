import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="main error-state" role="status">
      <p className="eyebrow">LOCAT AI</p>
      <h1>Page introuvable</h1>
      <p>Cette page ou ce logement n’existe plus.</p>
      <Link href="/" className="primary">Retour au tableau de bord</Link>
    </main>
  )
}
