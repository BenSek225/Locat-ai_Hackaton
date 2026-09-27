import { aiAnalysis, defaultListing, type Property, type Reminder } from './mock-data'
export const analyzeProperty = async (_property: Property) => aiAnalysis
export const generateListing = async (_property: Property) => defaultListing
export const generateRentReminder = async (reminder: Reminder) => ({ message: `Bonjour ${reminder.tenant},\n\nNous vous rappelons que votre loyer de ${reminder.rent} FCFA présente actuellement ${reminder.lateDays} jours de retard.\n\nMerci de régulariser votre situation.\n\nCordialement,\nLocat`, tone: 'respectueux' as const })
