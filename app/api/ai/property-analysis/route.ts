import { NextResponse } from 'next/server'
import { findProperty } from '@/lib/mock-data'
import { AIProviderError } from '@/lib/ai/schemas'
import { getAIProvider } from '@/lib/ai/provider'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const propertyId = typeof body?.propertyId === 'string' ? body.propertyId : ''
    const property = findProperty(propertyId)
    if (!property || property.id !== propertyId) return NextResponse.json({ error: 'Impossible de terminer l’analyse.' }, { status: 404 })
    const images = property.photos.slice(0, 3)
    console.info('[Locat AI] Vision request started', { images: images.length })
    const result = await getAIProvider().analyzeProperty({ images })
    console.info('[Locat AI] Output validated')
    return NextResponse.json({ result, imageCount: images.length })
  } catch (error) {
    const code = error instanceof AIProviderError ? error.code : 'provider_error'
    console.error(`[Locat AI] Provider error: ${code}`)
    const message = code === 'quota_exceeded' || code === 'rate_limited' ? 'Locat AI n’est momentanément pas disponible. Réessayez plus tard.' : 'Impossible de terminer l’analyse.'
    return NextResponse.json({ error: message, code }, { status: error instanceof AIProviderError ? error.status : 500 })
  }
}
