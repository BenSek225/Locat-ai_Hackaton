import { reminders } from '@/lib/mock-data'
import { getAIProvider } from '@/lib/ai/provider'
import { AIProviderError, validateRentReminderResult } from '@/lib/ai/schemas'
import { invalidInput, notFound, publicAIError, readJsonBody, aiErrorResponse } from '@/lib/ai/http'

export async function POST(request: Request) {
  const body = await readJsonBody(request)
  const paymentId = typeof body?.paymentId === 'string' ? body.paymentId.trim() : ''
  const tone = body?.tone === 'ferme' || body?.tone === 'respectueux' ? body.tone : null
  if (!body || !paymentId || paymentId.length > 80 || !tone) return invalidInput('Informations de relance invalides.')
  const payment = reminders.find((item) => item.id === paymentId)
  if (!payment) return notFound('Loyer introuvable.')
  if (payment.status !== 'retard') return aiErrorResponse('INVALID_INPUT', "Ce loyer n'est pas actuellement en retard.", 409)
  if (!payment.tenant || payment.tenant.length > 120 || !Number.isFinite(payment.rent) || payment.rent <= 0 || !Number.isInteger(payment.lateDays) || payment.lateDays <= 0 || payment.lateDays > 3650) return aiErrorResponse('INVALID_INPUT', 'Informations de paiement incomplètes.', 422)
  try {
    const result = validateRentReminderResult(await getAIProvider().generateRentReminder({ tenantName: payment.tenant, amount: payment.rent, currency: 'XOF', daysLate: payment.lateDays, propertyLabel: payment.property, tone }))
    return Response.json({ result })
  } catch (error) {
    if (!(error instanceof AIProviderError)) console.error('[Locat AI] Unexpected reminder failure')
    return publicAIError(error, 'Locat AI n’a pas pu générer la relance pour le moment. Réessayez.')
  }
}
