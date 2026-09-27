'use client'

import { type Property } from '@/lib/mock-data'
import { getProperties, getProperty } from '@/lib/property-storage'

export type ListingStatus = 'draft' | 'generated' | 'published' | 'unpublished'

export interface Listing {
  id: string
  propertyId: string
  title: string
  description: string
  highlights: string[]
  price: number
  status: ListingStatus
  is_public: boolean
  photos: string[]
  location: { neighborhood: string; city: string }
  characteristics: {
    type?: string
    surface?: number
    rooms?: number
    furnished?: boolean
  }
  aiGenerated: boolean
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

const STORAGE_KEY = 'locat-listings-v1'
const isBrowser = () => typeof window !== 'undefined'

function sourceProperty(propertyId: string): Property | undefined {
  return getProperty(propertyId)
}

function normalize(value: unknown): Listing | null {
  if (!value || typeof value !== 'object') return null
  const item = value as Partial<Listing>
  const property = item.propertyId ? sourceProperty(item.propertyId) : undefined
  if (!item.id || !property || typeof item.title !== 'string' || typeof item.status !== 'string' || typeof item.is_public !== 'boolean') return null
  return {
    id: item.id,
    propertyId: property.id,
    title: item.title,
    description: typeof item.description === 'string' ? item.description : '',
    highlights: Array.isArray(item.highlights) ? item.highlights.filter((v): v is string => typeof v === 'string') : [],
    price: property.rent,
    status: ['draft', 'generated', 'published', 'unpublished'].includes(item.status) ? item.status as ListingStatus : 'draft',
    is_public: item.is_public,
    photos: property.photos,
    location: { neighborhood: property.commune, city: 'Abidjan' },
    characteristics: { type: property.type, surface: property.surface, rooms: property.type === 'studio' ? 1 : property.type === '2_pieces' ? 2 : property.type === '3_pieces' ? 3 : undefined, furnished: property.meuble },
    aiGenerated: item.aiGenerated !== false,
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || new Date().toISOString(),
    publishedAt: item.publishedAt,
  }
}

export function readListings(): Listing[] {
  if (!isBrowser()) return []
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(parsed) ? parsed.map(normalize).filter((item): item is Listing => item !== null) : []
  } catch {
    return []
  }
}

function writeListings(listings: Listing[]) {
  if (isBrowser()) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(listings))
}

export function upsertListing(input: Pick<Listing, 'propertyId' | 'title' | 'description' | 'highlights'> & Partial<Pick<Listing, 'id' | 'status' | 'is_public'>>): Listing | null {
  const property = sourceProperty(input.propertyId)
  if (!property) return null
  const now = new Date().toISOString()
  const existing = readListings().find((listing) => listing.propertyId === property.id)
  const listing = normalize({
    ...(existing || {}),
    ...input,
    id: input.id || existing?.id || `listing-${property.id}`,
    status: input.status || existing?.status || 'generated',
    is_public: input.is_public ?? existing?.is_public ?? false,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  })
  if (!listing) return null
  writeListings([...readListings().filter((item) => item.id !== listing.id), listing])
  return listing
}

export function publishListing(propertyId: string, content: Pick<Listing, 'title' | 'description' | 'highlights'>): Listing | null {
  const existing = readListings().find((listing) => listing.propertyId === propertyId)
  return upsertListing({ ...content, propertyId, id: existing?.id, status: 'published', is_public: true })
}

export function findStoredListing(id: string): Listing | null {
  const stored = readListings().find((listing) => listing.id === id && listing.is_public && listing.status === 'published')
  if (stored) return stored
  const property = getProperties().find((item) => item.isPublic && (item.id === id || `listing-${item.id}` === id))
  return property ? seededPublicListing(property) : null
}

export function findPropertyListing(propertyId: string): Listing | null {
  return readListings().find((listing) => listing.propertyId === propertyId) || null
}

export function getPublicListings(): Listing[] {
  const stored = readListings().filter((listing) => listing.is_public && listing.status === 'published')
  const storedPropertyIds = new Set(stored.map((listing) => listing.propertyId))
  return [...stored, ...getProperties().filter((property) => property.isPublic && !storedPropertyIds.has(property.id)).map(seededPublicListing)]
}

export function removeListingStorage() {
  if (isBrowser()) window.localStorage.removeItem(STORAGE_KEY)
}

export function getSourceProperty(propertyId: string) {
  return sourceProperty(propertyId)
}

export const listingStorageKey = STORAGE_KEY

export function seededPublicListing(property: Property): Listing {
  const now = new Date().toISOString()
  return normalize({ id: `listing-${property.id}`, propertyId: property.id, title: `${property.type === 'studio' ? 'Studio' : property.type === '2_pieces' ? '2 pièces' : property.type === '3_pieces' ? '3 pièces' : 'Villa'} à ${property.commune}`, description: property.description, highlights: [], status: 'published', is_public: true, createdAt: now, updatedAt: now })!
}

export { STORAGE_KEY }
