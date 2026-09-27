import { NextResponse } from 'next/server'
import { findProperty } from '@/lib/mock-data'
import { getAIProvider } from '@/lib/ai/provider'
import { AIProviderError, validatePropertyAnalysis } from '@/lib/ai/schemas'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const propertyId = typeof body?.propertyId === 'string' ? body.propertyId : ''
    const property = findProperty(propertyId)
    if (!property || property.id !== propertyId) return NextResponse.json({ error: 'Logement introuvable.' }, { status: 404 })
    let analysis
    try { analysis = validatePropertyAnalysis(body?.analysis) } catch { return NextResponse.json({ error: 'Les observations visuelles sont invalides.' }, { status: 400 }) }
    const result = await getAIProvider().generateListing({ property: { id: property.id, numero: property.numero, type: property.type, surface: property.surface, rent: property.rent, status: property.status, meuble: property.meuble, description: property.description, structure: { nom: property.structure, commune: property.commune, ville: 'Abidjan' } }, analysis })
    return NextResponse.json({ result })
  } catch (error) {
    const code = error instanceof AIProviderError ? error.code : 'provider_error'
    const status = error instanceof AIProviderError ? error.status : 500
    const message = code === 'rate_limited' || code === 'quota_exceeded' ? 'Locat AI est momentanément indisponible. Réessayez plus tard.' : 'Impossible de rédiger l’annonce.'
    return NextResponse.json({ error: message, code }, { status })
  }
}
