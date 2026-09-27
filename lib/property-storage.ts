'use client'

import { properties as seedProperties, type Property, type HousingType } from '@/lib/mock-data'

export const PROPERTY_STORAGE_KEY = 'locat-properties-v1'
const isBrowser = () => typeof window !== 'undefined'

function validProperty(value: unknown): value is Property {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<Property>
  return typeof item.id === 'string' && typeof item.numero === 'string' && typeof item.surface === 'number' && item.surface > 0 && typeof item.rent === 'number' && item.rent > 0 && (item.status === 'libre' || item.status === 'occupe') && typeof item.commune === 'string' && typeof item.structure === 'string' && Array.isArray(item.photos)
}

function readStored(): Property[] {
  if (!isBrowser()) return []
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(PROPERTY_STORAGE_KEY) || '[]')
    return Array.isArray(parsed) ? parsed.filter(validProperty) : []
  } catch { return [] }
}

function writeStored(items: Property[]): void {
  if (isBrowser()) window.localStorage.setItem(PROPERTY_STORAGE_KEY, JSON.stringify(items))
}

export function getProperties(): Property[] {
  const stored = readStored()
  const overrides = new Map(stored.map((property) => [property.id, property]))
  return [...seedProperties.map((property) => overrides.get(property.id) ?? property), ...stored.filter((property) => !seedProperties.some((seed) => seed.id === property.id))]
}

export function getProperty(id: string): Property | undefined { return getProperties().find((property) => property.id === id) }

export type NewProperty = Omit<Property, 'id'> & { id?: string }
export function addProperty(input: NewProperty): Property {
  const current = getProperties()
  const id = input.id?.trim() || `p-${crypto.randomUUID()}`
  if (current.some((property) => property.id === id || property.numero.toLowerCase() === input.numero.trim().toLowerCase())) throw new Error('Un logement avec cette référence existe déjà.')
  const property: Property = { ...input, id, numero: input.numero.trim(), description: input.description.trim(), photos: input.photos.length ? input.photos : seedProperties[0].photos }
  writeStored([...readStored(), property])
  return property
}

export function updateProperty(id: string, updates: Partial<Property>): Property | undefined {
  const property = getProperty(id)
  if (!property) return undefined
  const next = { ...property, ...updates, id }
  writeStored([...readStored().filter((item) => item.id !== id), next])
  return next
}

export function deleteProperty(id: string): void { writeStored(readStored().filter((property) => property.id !== id)) }
export function clearStoredProperties(): void { if (isBrowser()) window.localStorage.removeItem(PROPERTY_STORAGE_KEY) }
export type { HousingType }
export { PROPERTY_STORAGE_KEY as STORAGE_KEY }
export default getProperties
