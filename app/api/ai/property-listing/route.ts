import { getProperty } from '@/lib/property-storage'
import { getAIProvider } from '@/lib/ai/provider'
import { AIProviderError, validatePropertyAnalysis } from '@/lib/ai/schemas'
import { invalidInput, notFound, publicAIError, readJsonBody } from '@/lib/ai/http'

export async function POST(request: Request) {
  const body = await readJsonBody(request)
  if (!body || typeof body.propertyId !== 'string' || body.propertyId.length > 80) return invalidInput('Identifiant de logement invalide.')
  const property = getProperty(body.propertyId)
  if (!property) return notFound('Logement introuvable.')
  let analysis
  try { analysis = validatePropertyAnalysis(body.analysis) } catch { return invalidInput('Les observations visuelles sont invalides.') }
  try {
    const result = await getAIProvider().generateListing({ property: { id: property.id, numero: property.numero, type: property.type, surface: property.surface, rent: property.rent, status: property.status, meuble: property.meuble, description: property.description, structure: { nom: property.structure, commune: property.commune, ville: 'Abidjan' } }, analysis })
    return Response.json({ result })
  } catch (error) {
    if (!(error instanceof AIProviderError)) console.error('[Locat AI] Unexpected listing failure')
    return publicAIError(error, 'Locat AI n’a pas pu rédiger l’annonce pour le moment. Réessayez.')
  }
}
