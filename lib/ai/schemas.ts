export type PropertyAnalysisResult = { detectedSpaces: string[]; visibleFeatures: string[]; uncertainElements: string[] }

function validateStringArray(value: unknown): value is string[] { return Array.isArray(value) && value.every((item) => typeof item === 'string' && item.trim().length > 0) }
export function validatePropertyAnalysis(value: unknown): PropertyAnalysisResult { if (!value || typeof value !== 'object') throw new Error('invalid_output'); const result=value as Record<string,unknown>; if (!validateStringArray(result.detectedSpaces)||!validateStringArray(result.visibleFeatures)||!validateStringArray(result.uncertainElements)) throw new Error('invalid_output'); return { detectedSpaces: result.detectedSpaces as string[], visibleFeatures: result.visibleFeatures as string[], uncertainElements: result.uncertainElements as string[] } }
export function parsePropertyAnalysis(raw: string): PropertyAnalysisResult { const cleaned=raw.trim().replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/i,''); return validatePropertyAnalysis(JSON.parse(cleaned)) }

export type TrustedPropertyData = { id:string; numero:string; type:string; surface:number|null; rent:number; status:'libre'|'occupe'; meuble:boolean|null; description:string|null; structure:{nom:string; commune:string; ville:string} }
export type ListingGenerationInput = { property: TrustedPropertyData; analysis: PropertyAnalysisResult }
export type ListingGenerationResult = { title:string; description:string; highlights:string[]; warnings:string[] }
export function validateListingResult(value: unknown): ListingGenerationResult { if (!value||typeof value!=='object') throw new Error('invalid_output'); const r=value as Record<string,unknown>; if(typeof r.title!=='string'||r.title.trim().length===0||r.title.length>120||typeof r.description!=='string'||r.description.trim().length===0||!validateStringArray(r.highlights)||!validateStringArray(r.warnings)||r.highlights.length<1||r.highlights.length>5) throw new Error('invalid_output'); return {title:r.title.trim(),description:r.description.trim(),highlights:(r.highlights as string[]).slice(0,5),warnings:(r.warnings as string[]).slice(0,5)} }
export function parseListingResult(raw:string):ListingGenerationResult { const cleaned=raw.trim().replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/i,''); return validateListingResult(JSON.parse(cleaned)) }
export type PropertyAnalysisInput = { images:string[] }
export type RentReminderInput = { tenantName:string; amount:number; currency:'XOF'; daysLate:number; propertyLabel?:string; tone:'respectueux'|'ferme' }
export type RentReminderResult = { message:string }
export function validateRentReminderResult(value: unknown): RentReminderResult { if (!value || typeof value !== 'object') throw new Error('invalid_output'); const message=(value as Record<string,unknown>).message; if (typeof message !== 'string' || message.trim().length === 0 || message.length > 1500) throw new Error('invalid_output'); return { message: message.trim() } }
export function parseRentReminderResult(raw:string): RentReminderResult { const cleaned=raw.trim().replace(/^```(?:json)?\\s*/i,'').replace(/\\s*```$/i,''); return validateRentReminderResult(JSON.parse(cleaned)) }
export type AIErrorCode = 'missing_api_key'|'invalid_api_key'|'quota_exceeded'|'rate_limited'|'provider_error'|'timeout'|'invalid_output'
export class AIProviderError extends Error { constructor(public code:AIErrorCode,public status=500){super(code)} }
export interface AIProvider { analyzeProperty(input:PropertyAnalysisInput):Promise<PropertyAnalysisResult>; generateListing(input:ListingGenerationInput):Promise<ListingGenerationResult>; generateRentReminder(input:RentReminderInput):Promise<RentReminderResult> }
export type { Reminder } from '@/lib/mock-data'
export type { Property } from '@/lib/mock-data' 
