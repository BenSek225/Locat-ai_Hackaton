import { NextResponse } from 'next/server'
import { reminders } from '@/lib/mock-data'
import { getAIProvider } from '@/lib/ai/provider'
import { AIProviderError, validateRentReminderResult } from '@/lib/ai/schemas'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const paymentId = typeof body?.paymentId === 'string' ? body.paymentId.trim() : ''
    const tone = body?.tone === 'ferme' ? 'ferme' : body?.tone === 'respectueux' ? 'respectueux' : null
    if (!paymentId || !tone) return NextResponse.json({ error: 'Informations de relance invalides.' }, { status: 400 })
    const payment = reminders.find((item) => item.id === paymentId)
    if (!payment) return NextResponse.json({ error: 'Loyer introuvable.' }, { status: 404 })
    if (payment.status !== 'retard') return NextResponse.json({ error: "Ce loyer n'est pas actuellement en retard.", code: 'payment_not_late' }, { status: 409 })
    if (!payment.tenant || !Number.isFinite(payment.rent) || payment.rent <= 0 || !Number.isInteger(payment.lateDays) || payment.lateDays < 0) return NextResponse.json({ error: 'Informations de paiement incomplètes.' }, { status: 422 })
    const result = validateRentReminderResult(await getAIProvider().generateRentReminder({ tenantName: payment.tenant, amount: payment.rent, currency: 'XOF', daysLate: payment.lateDays, propertyLabel: payment.property, tone }))
    return NextResponse.json({ result })
  } catch (error) {
    const code = error instanceof AIProviderError ? error.code : 'provider_error'
    const status = error instanceof AIProviderError ? error.status : 500
    const message = code === 'rate_limited' || code === 'quota_exceeded' ? 'Locat AI est temporairement indisponible. Vous pouvez réessayer plus tard.' : code === 'timeout' ? 'Impossible de générer la relance pour le moment.' : 'Impossible de générer la relance.'
    return NextResponse.json({ error: message, code }, { status })
  }
}
