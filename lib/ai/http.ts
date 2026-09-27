import { NextResponse } from 'next/server'

export type PublicAIErrorCode = 'INVALID_INPUT' | 'NOT_FOUND' | 'AI_UNAVAILABLE' | 'AI_TIMEOUT' | 'AI_QUOTA' | 'AI_INVALID_RESPONSE' | 'UNKNOWN_ERROR'

export function aiErrorResponse(code: PublicAIErrorCode, message: string, status: number) {
  return NextResponse.json({ error: { code, message } }, { status })
}

export async function readJsonBody(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await request.json()
    return body && typeof body === 'object' && !Array.isArray(body) ? body as Record<string, unknown> : null
  } catch {
    return null
  }
}

export function publicAIError(error: unknown, fallback: string) {
  const code = error instanceof Error && 'code' in error ? String(error.code) : 'provider_error'
  if (code === 'timeout') return aiErrorResponse('AI_TIMEOUT', 'L’analyse prend plus de temps que prévu. Réessayez.', 504)
  if (code === 'quota_exceeded' || code === 'rate_limited') return aiErrorResponse('AI_QUOTA', 'Locat AI a atteint temporairement sa limite de génération. Réessayez plus tard.', 429)
  if (code === 'invalid_output') return aiErrorResponse('AI_INVALID_RESPONSE', 'Locat AI n’a pas pu générer un résultat exploitable. Réessayez.', 502)
  return aiErrorResponse('AI_UNAVAILABLE', fallback, 503)
}

export function invalidInput(message: string) { return aiErrorResponse('INVALID_INPUT', message, 400) }
export function notFound(message: string) { return aiErrorResponse('NOT_FOUND', message, 404) }
