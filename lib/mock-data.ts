export type HousingType = 'studio' | '2_pieces' | '3_pieces' | 'villa'
export type Property = { id: string; numero: string; type: HousingType; surface: number; rent: number; status: 'libre' | 'occupe'; description: string; isPublic: boolean; meuble: boolean; photos: string[]; structure: string; commune: string; tenant?: string; lateDays?: number }
export type Reminder = { id: string; tenant: string; property: string; rent: number; status: 'a_jour' | 'retard' | 'envoye'; lateDays: number }
export const photos = ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85']
export const properties: Property[] = [
 {id:'a02',numero:'A02',type:'2_pieces',surface:55,rent:250000,status:'libre',description:'Un appartement lumineux et traversant, idéal pour un couple. Profitez d’une cuisine ouverte, d’un balcon et d’une belle lumière naturelle.',isPublic:false,meuble:false,photos,structure:'Résidence Les Palmiers',commune:'Cocody'},
 {id:'a01',numero:'A01',type:'studio',surface:32,rent:180000,status:'occupe',description:'Studio fonctionnel au calme.',isPublic:false,meuble:false,photos:[photos[1]],structure:'Résidence Les Palmiers',commune:'Cocody',tenant:'Jean Kouassi'},
 {id:'b03',numero:'B03',type:'3_pieces',surface:78,rent:420000,status:'occupe',description:'Grand appartement familial.',isPublic:false,meuble:true,photos:[photos[2]],structure:'Cour familiale Bamba',commune:'Yopougon',tenant:'Marie N\'Guessan',lateDays:12},
 {id:'b01',numero:'B01',type:'studio',surface:28,rent:150000,status:'libre',description:'Studio neuf avec cour intérieure.',isPublic:true,meuble:false,photos:[photos[0]],structure:'Cour familiale Bamba',commune:'Yopougon'},
 {id:'h04',numero:'04',type:'villa',surface:140,rent:750000,status:'occupe',description:'Villa moderne avec jardin.',isPublic:false,meuble:false,photos:[photos[1]],structure:'Résidence Horizon',commune:'Marcory',tenant:'Paul Yao'},
 {id:'h02',numero:'02',type:'2_pieces',surface:60,rent:290000,status:'libre',description:'Deux pièces calme et sécurisé.',isPublic:true,meuble:true,photos:[photos[2]],structure:'Résidence Horizon',commune:'Marcory'},
]
export const reminders: Reminder[] = [
 {id:'r1',tenant:'Jean Kouassi',property:'A02 · Résidence Les Palmiers',rent:250000,status:'retard',lateDays:12},
 {id:'r2',tenant:'Marie N\'Guessan',property:'B03 · Cour familiale Bamba',rent:420000,status:'retard',lateDays:30},
 {id:'r3',tenant:'Paul Yao',property:'04 · Résidence Horizon',rent:750000,status:'a_jour',lateDays:0},
 {id:'r4',tenant:'Awa Diarra',property:'A01 · Résidence Les Palmiers',rent:180000,status:'a_jour',lateDays:0},
 {id:'r5',tenant:'Koffi Adjoua',property:'B01 · Cour familiale Bamba',rent:150000,status:'a_jour',lateDays:0},
 {id:'r6',tenant:'Nathalie N\'Guessan',property:'02 · Résidence Horizon',rent:290000,status:'a_jour',lateDays:0},
]
export const typeLabels: Record<HousingType,string> = {studio:'Studio','2_pieces':'2 pièces','3_pieces':'3 pièces',villa:'Villa'}
export const formatCfa = (n:number) => new Intl.NumberFormat('fr-FR').format(n) + ' FCFA'
export const findProperty = (id:string) => properties.find(p=>p.id===id) ?? properties[0]
export const findListing = (id:string) => properties.find(p=>p.id===id && p.isPublic) ?? properties.find(p=>p.isPublic)!
export const aiAnalysis = { visibleFeatures:['Salon lumineux','Cuisine ouverte','Balcon visible','Sol carrelé'], uncertainElements:['État exact des murs'] }
export const defaultListing = { title:'2 pièces lumineux à Cocody', description:'Découvrez ce bel appartement de 2 pièces situé au cœur de Cocody. Baigné de lumière naturelle, il propose une cuisine ouverte, un salon agréable et un balcon visible. Un cadre de vie pratique et chaleureux dans une résidence bien située.', highlights: aiAnalysis.visibleFeatures.slice(0,3), warnings:['État des murs non déterminé avec certitude'] }
