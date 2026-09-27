import { getAIProvider } from '@/lib/ai/provider'
import { AIProviderError } from '@/lib/ai/schemas'
import { invalidInput, publicAIError, readJsonBody } from '@/lib/ai/http'

export async function POST(request: Request) {
  const body = await readJsonBody(request)
  if (!body || typeof body.propertyId !== 'string' || body.propertyId.length > 80) return invalidInput('Identifiant de logement invalide.')
  if (!body.property || !Array.isArray(body.property.photos)) return invalidInput('Données du logement manquantes.')
  
  const images = body.property.photos
    .filter((photo: unknown) => typeof photo === 'string' && /^https?:\/\//i.test(photo))
    .slice(0, 3)
  if (images.length === 0) return invalidInput('Aucune photo exploitable pour ce logement.')
  
  try {
    const result = await getAIProvider().analyzeProperty({ images })
    return Response.json({ result, imageCount: images.length })
  } catch (error) {
    if (!(error instanceof AIProviderError)) console.error('[Locat AI] Unexpected analysis failure')
    return publicAIError(error, 'Locat AI n\'a pas pu terminer l\'analyse pour le moment. Réessayez.')
  }
}
