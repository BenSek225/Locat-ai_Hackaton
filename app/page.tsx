'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Bell, Brain, Building2, CalendarDays, Check, ChevronRight, CircleAlert, Eye, Home, Menu, Search, Sparkles, WalletCards, X } from 'lucide-react'
import { aiAnalysis, defaultListing, formatCfa, reminders, typeLabels, type Property, type Reminder } from '@/lib/mock-data'
import { addProperty, getProperties, getProperty } from '@/lib/property-storage'
import { findPropertyListing, findStoredListing, getPublicListings, publishListing, type Listing } from '@/lib/listing-storage'

// Photos démo disponibles pour nouveaux logements
const DEMO_PHOTOS = [
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
  'https://images.unsplash.com/photo-1502672260066-6bc357c4ee12?w=800',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
]

const nav=[['Dashboard','/'],['Logements','/logements'],['Loyers','/loyers'],['Annonces','/annonces']]
function Shell({children,publicView=false}:{children:React.ReactNode;publicView?:boolean}){const pathname=usePathname(); const [open,setOpen]=useState(false); return <><header className="topbar"><Link href="/" className="brand"><span className="brand-mark">L</span><span>Locat <b>AI</b></span></Link><nav className={open?'nav open':'nav'}>{nav.map(([label,href])=><Link key={href} className={pathname===href?'active':''} href={href} onClick={()=>setOpen(false)}>{label}</Link>)}</nav><div className="top-actions"><button className="icon-btn" aria-label="Notifications"><Bell/></button><div className="avatar">GB</div><span className="manager">Gestionnaire</span><button className="menu-btn" onClick={()=>setOpen(!open)} aria-label="Menu"><Menu/></button></div></header><main className={publicView?'public-main':'main'}>{children}</main></>}
function Badge({children,tone='neutral'}:{children:React.ReactNode;tone?:string}){return <span className={'badge '+tone}>{children}</span>}
function Stat({icon:Icon,value,label,note,href}:{icon:any,value:string,label:string,note:string,href:string}){return <Link href={href} className="stat-card"><div className="stat-icon"><Icon/></div><div><strong>{value}</strong><p>{label}</p><small>{note}</small></div><ChevronRight className="stat-arrow"/></Link>}
function AiCard({children,href,icon:Icon=Sparkles}:{children:React.ReactNode;href:string;icon?:any}){return <Link href={href} className="ai-action"><div className="ai-action-icon"><Icon/></div><div>{children}</div><ChevronRight/></Link>}

function Dashboard(){
  const dashboardProperties=getProperties()
  const totalProperties=dashboardProperties.length
  const freeProperties=dashboardProperties.filter((property)=>property.status==='libre')
  const occupiedProperties=dashboardProperties.filter((property)=>property.status==='occupe')
  const publishedListings=getPublicListings()
  const freeWithoutListing=freeProperties.filter((property)=>!publishedListings.some((listing)=>listing.propertyId===property.id))
  
  // 🔴 P0.4 - Calcul dynamique des retards depuis reminders
  const lateReminders = reminders.filter(r => r.status === 'retard')
  const onTimeReminders = reminders.filter(r => r.status !== 'retard')
  const lateCount = lateReminders.length
  
  return <Shell><section className="page-head"><div><p className="eyebrow">DIMANCHE 27 SEPTEMBRE 2026</p><h1>Bonjour Bienvenu</h1><p>Voici l'état de votre portefeuille immobilier.</p></div><div className="today"><CalendarDays/> <span>Aujourd'hui<br/><b>27 septembre</b></span></div></section><div className="stats"><Stat icon={Building2} value={String(totalProperties)} label="Logements" note={`${occupiedProperties.length} occupés · ${freeProperties.length} libres`} href="/logements"/><Stat icon={Home} value={String(freeProperties.length)} label="Logements libres" note={`${freeWithoutListing.length} prêts pour Locat AI`} href="/logements"/><Stat icon={CircleAlert} value={String(lateCount)} label={lateCount > 1 ? "Loyers en retard" : "Loyer en retard"} note="À traiter aujourd'hui" href="/loyers"/></div><section className="dashboard-grid"><div className="payment-card"><div className="payment-top"><div><p className="card-kicker">LOYERS — SEPTEMBRE</p><h2>4 300 000 <small>FCFA</small></h2><span className="muted-light">Revenus attendus ce mois</span></div><div className="payment-icon"><WalletCards/></div></div><div className="payment-details"><div><span>Reçus</span><b>3 850 000 FCFA</b></div><div><span>En attente</span><b>450 000 FCFA</b></div><div><span>Impayés</span><b className="danger-light">{lateCount} {lateCount > 1 ? 'locataires' : 'locataire'}</b></div></div><div className="recovery"><span>Taux de recouvrement <b>89%</b></span><div className="progress"><i style={{width:'89%'}}/></div></div></div><div className="recent"><div className="section-title"><h2>Activité récente</h2><button className="text-btn">Voir tout</button></div><Activity icon={<Check/>} tone="success" title="Paiement validé" text="Jean Kouassi · 250 000 FCFA"/><Activity icon={<CircleAlert/>} tone="warning" title="Loyer en retard" text="Marie N'Guessan · 30 jours"/><Activity icon={<Sparkles/>} tone="ai" title="Annonce générée par Locat AI" text="Studio A · il y a 4 min"/></div></section><section className="ai-panel"><div className="ai-heading"><div className="ai-orb"><Sparkles/></div><div><div className="ai-title">Locat AI <Badge tone="ai-badge">AI</Badge></div><p>Des actions intelligentes à partir de votre portefeuille.</p></div></div><div className="ai-actions">{freeWithoutListing.length>0?<AiCard href={`/logements/${freeWithoutListing[0].id}`} icon={Home}><b>{freeWithoutListing.length===1?'1 logement libre sans annonce':`${freeWithoutListing.length} logements libres sans annonce`}</b><span>Transformez {freeWithoutListing.length===1?'ses':'leurs'} photos en annonce{freeWithoutListing.length===1?'':'s'} prête{freeWithoutListing.length===1?'':'s'} à publier.</span><strong>Analyser {freeWithoutListing.length===1?'le logement':'les logements'} <ChevronRight/></strong></AiCard>:<div className="ai-action empty"><div className="ai-action-icon"><Check/></div><div><b>Tous les logements libres ont une annonce</b><span>Excellent travail ! Vos logements sont bien référencés.</span></div></div>}<AiCard href="/loyers" icon={Brain}><b>{lateCount} {lateCount > 1 ? 'loyers' : 'loyer'} en retard</b><span>Générez une relance personnalisée adaptée au contexte.</span><strong>Voir les retards <ChevronRight/></strong></AiCard></div></section></Shell>
}

function Activity({icon,tone,title,text}:{icon:React.ReactNode;tone:string;title:string;text:string}){return <div className="activity"><span className={'activity-icon '+tone}>{icon}</span><div><b>{title}</b><p>{text}</p></div></div>}
function PropertyCard({p}:{p:Property}){return <Link href={'/logements/'+p.id} className="property-card"><div className="property-image"><img src={p.photos[0]} alt={p.type+' à '+p.commune}/><Badge tone={p.status==='libre'?'free':'occupied'}>{p.status==='libre'?'Libre':'Occupé'}</Badge></div><div className="property-body"><div className="property-title"><div><h3>{typeLabels[p.type]} {p.numero}</h3><p>{p.structure}</p></div><ChevronRight/></div><div className="property-meta"><span>{p.surface} m²</span><span>{p.meuble?'Meublé':'Non meublé'}</span></div><b className="property-rent">{formatCfa(p.rent)} <small>/ mois</small></b>{p.status==='libre'&&<span className="ready"><Sparkles/> Prêt pour Locat AI</span>}</div></Link>}

export function Logements(){
  const [filter,setFilter]=useState('Tous')
  const [query,setQuery]=useState('')
  const [items,setItems]=useState<Property[]>([])
  const [showForm,setShowForm]=useState(false)
  // 🔴 P0.2 - Sélection de photos démo
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])
  const router=useRouter()
  
  useEffect(()=>setItems(getProperties()),[])
  
  const list=items.filter(p=>(filter==='Tous'||(filter==='Libres'&&p.status==='libre')||(filter==='Occupés'&&p.status==='occupe'))&&(p.numero+p.structure+p.commune).toLowerCase().includes(query.toLowerCase()))
  
  const togglePhoto = (photo: string) => {
    setSelectedPhotos(prev => 
      prev.includes(photo) ? prev.filter(p => p !== photo) : [...prev, photo]
    )
  }
  
  const save=(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    const data=new FormData(event.currentTarget)
    try{
      const property=addProperty({
        numero:String(data.get('numero')||''),
        type:String(data.get('type')||'studio') as Property['type'],
        surface:Number(data.get('surface')),
        rent:Number(data.get('rent')),
        status:String(data.get('status')||'libre') as Property['status'],
        description:String(data.get('description')||''),
        isPublic:false,
        meuble:data.get('meuble')==='on',
        photos:selectedPhotos.length > 0 ? selectedPhotos : DEMO_PHOTOS.slice(0, 2), // 🔴 P0.2 - Utiliser photos sélectionnées
        structure:String(data.get('structure')||''),
        commune:String(data.get('commune')||'')
      })
      setItems(getProperties())
      setShowForm(false)
      setSelectedPhotos([])
      router.push('/logements/'+property.id)
    }catch(error){
      window.alert(error instanceof Error?error.message:'Impossible de créer le logement.')
    }
  }
  
  return <Shell><section className="page-head row"><div><p className="eyebrow">PORTEFEUILLE IMMOBILIER</p><h1>Logements</h1><p>{items.length} logements · {items.filter(p=>p.status==='occupe').length} occupés · {items.filter(p=>p.status==='libre').length} libres</p></div><button className="primary" onClick={()=>setShowForm(true)}><Home/> Ajouter un logement</button></section><div className="toolbar"><div className="search"><Search/><input aria-label="Rechercher" placeholder="Rechercher un logement" value={query} onChange={e=>setQuery(e.target.value)}/></div><div className="tabs">{['Tous','Libres','Occupés'].map(f=><button className={filter===f?'selected':''} onClick={()=>setFilter(f)} key={f}>{f}</button>)}</div></div>{list.length===0?<div className="empty-state"><h2>{items.length?'Aucun logement correspondant':'Aucun logement'}</h2><button className="primary" onClick={()=>setShowForm(true)}>Ajouter votre premier logement</button></div>:<div className="property-grid">{list.map(p=><PropertyCard p={p} key={p.id}/>)}</div>}{showForm&&<div className="overlay" onClick={e=>e.target===e.currentTarget&&setShowForm(false)}><form className="reminder-panel" onSubmit={save} style={{maxHeight:'90vh',overflowY:'auto'}}><button type="button" className="close" onClick={()=>setShowForm(false)} aria-label="Fermer"><X/></button><p className="eyebrow">NOUVEAU LOGEMENT</p><h2>Ajouter un logement</h2><label>Référence<input name="numero" required placeholder="C12"/></label><label>Type<select name="type" defaultValue="studio"><option value="studio">Studio</option><option value="2_pieces">2 pièces</option><option value="3_pieces">3 pièces</option><option value="villa">Villa</option></select></label><label>Surface (m²)<input name="surface" type="number" min="1" required/></label><label>Loyer mensuel<input name="rent" type="number" min="1" required/></label><label>Commune<input name="commune" required placeholder="Cocody"/></label><label>Structure<input name="structure" required placeholder="Résidence Test"/></label><label>Description<textarea name="description" minLength={10} required/></label><label><input name="meuble" type="checkbox"/> Meublé</label><div style={{marginTop:'1rem'}}><label style={{display:'block',marginBottom:'0.5rem'}}>Photos du logement (sélectionnez 1 à 4)</label><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.5rem'}}>{DEMO_PHOTOS.map((photo,i)=><label key={photo} style={{display:'flex',alignItems:'center',gap:'0.5rem',padding:'0.5rem',border:selectedPhotos.includes(photo)?'2px solid var(--primary)':'1px solid #ddd',borderRadius:'4px',cursor:'pointer'}}><input type="checkbox" checked={selectedPhotos.includes(photo)} onChange={()=>togglePhoto(photo)}/><img src={photo} alt={`Photo ${i+1}`} style={{width:'60px',height:'60px',objectFit:'cover',borderRadius:'4px'}}/><span>Photo {i+1}</span></label>)}</div><small style={{display:'block',marginTop:'0.5rem',color:'#666'}}>{selectedPhotos.length} photo{selectedPhotos.length>1?'s':''} sélectionnée{selectedPhotos.length>1?'s':''}</small></div><button className="primary" type="submit" style={{marginTop:'1rem'}}>Créer le logement</button></form></div>}</Shell>
}

export function PropertyDetail({id}:{id:string}){
  // 🟠 P1.7 - Hooks avant le return
  const [step,setStep]=useState<'idle'|'analyzing'|'analysis'|'generating'|'listing'>('idle')
  const [photo,setPhoto]=useState(0)
  const [title,setTitle]=useState(defaultListing.title)
  const [description,setDescription]=useState(defaultListing.description)
  const [published,setPublished]=useState(false)
  const [vision,setVision]=useState(aiAnalysis)
  const [visionError,setVisionError]=useState('')
  const [warnings,setWarnings]=useState<string[]>([])
  const [highlights,setHighlights]=useState<string[]>([])
  const [isGenerating,setIsGenerating]=useState(false)
  const [imageCount, setImageCount] = useState(3)
  const router=useRouter()
  
  const p=getProperty(id)
  
  useEffect(()=>{
    if (!p) return
    const existing=findPropertyListing(id)
    if(existing){
      setTitle(existing.title)
      setDescription(existing.description)
      setHighlights(existing.highlights)
      setPublished(existing.is_public)
      setStep('listing')
    }
  },[id, p])
  
  if(!p) return <Shell><div className="empty-state"><h2>Logement introuvable</h2><Link href="/logements" className="primary">Retour aux logements</Link></div></Shell>
  
  const run=async(next:any)=>{
    if(isGenerating)return
    setVisionError('')
    
    if(next==='analyzing'){
      setStep('analyzing')
      try{
        // 🔴 P0.1 - Envoyer property complet depuis le client
        const response=await fetch('/api/ai/property-analysis',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({propertyId:id, property: p})
        })
        const payload=await response.json()
        if(!response.ok)throw new Error(payload.error||'Impossible de terminer l'analyse.')
        setVision(payload.result)
        setImageCount(payload.imageCount || p.photos.length)
        setStep('analysis')
      }catch(error){
        setVisionError(error instanceof Error?error.message:'Impossible de terminer l'analyse.')
        setStep('idle')
      }
    } else if(next==='generating'){
      setIsGenerating(true)
      setStep('generating')
      try{
        // 🔴 P0.1 - Envoyer property complet depuis le client
        const response=await fetch('/api/ai/property-listing',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({propertyId:id, property: p, analysis:vision})
        })
        const payload=await response.json()
        if(!response.ok)throw new Error(payload.error||'Impossible de rédiger l'annonce.')
        setTitle(payload.result.title)
        setDescription(payload.result.description)
        setHighlights(payload.result.highlights)
        setWarnings(payload.result.warnings)
        setStep('listing')
      }catch(error){
        setVisionError(error instanceof Error?error.message:'Impossible de rédiger l'annonce.')
        setStep('analysis')
      }finally{
        setIsGenerating(false)
      }
    }
  }
  
  return <Shell><Link href="/logements" className="back">← Retour aux logements</Link><section className="detail-head"><div><p className="eyebrow">{p.structure} · {p.commune}</p><h1>Logement {p.numero}</h1></div><Badge tone={p.status==='libre'?'free':'occupied'}>{p.status==='libre'?'Libre':'Occupé'}</Badge></section><div className="detail-grid"><div><div className="gallery"><img src={p.photos[photo]} alt="Photo du logement"/><div className="gallery-nav"><button onClick={()=>setPhoto((photo+p.photos.length-1)%p.photos.length)}>←</button><span>{photo+1} / {p.photos.length}</span><button onClick={()=>setPhoto((photo+1)%p.photos.length)}>→</button></div></div><div className="thumbs">{p.photos.map((url,i)=><button className={photo===i?'current':''} onClick={()=>setPhoto(i)} key={url}><img src={url} alt={'Vue '+(i+1)}/></button>)}</div></div><div className="detail-info"><h2>Informations</h2><div className="info-grid"><Info label="Statut" value={p.status==='libre'?'Libre':'Occupé'}/><Info label="Type" value={typeLabels[p.type]}/><Info label="Surface" value={p.surface+' m²'}/><Info label="Loyer" value={formatCfa(p.rent)}/><Info label="Meublé" value={p.meuble?'Oui':'Non'}/><Info label="Localisation" value={p.commune}/></div><div className="description"><h3>Description</h3><p>{p.description}</p></div>{p.status==='libre'&&<button className="primary wide" onClick={()=>run('analyzing')} disabled={step==='analyzing'||step==='generating'}><Sparkles/> Analyser avec Locat AI</button>}</div></div>{visionError&&<div className="ai-error" role="alert">{visionError} <button className="text-btn" onClick={()=>run('analyzing')}>Réessayer</button></div>}{(step==='analyzing'||step==='analysis'||step==='generating'||step==='listing')&&<AiWorkflow step={step} property={p} title={title} setTitle={setTitle} description={description} setDescription={setDescription} vision={vision} imageCount={imageCount} highlights={highlights} warnings={warnings} onGenerate={()=>run('generating')} onPublish={()=>{setPublished(true); publishListing(id,{title,description,highlights}); router.push('/annonces');setStep('listing'); window.location.href='/annonces'}}/>}{published&&<div/>}</Shell>
}

function Info({label,value}:{label:string;value:string}){return <div><span>{label}</span><b>{value}</b></div>}

function AiWorkflow({step,property,title,setTitle,description,setDescription,vision,imageCount,highlights,warnings,onGenerate,onPublish}:{step:string;property:Property;title:string;setTitle:(x:string)=>void;description:string;setDescription:(x:string)=>void;vision:{detectedSpaces:string[];visibleFeatures:string[];uncertainElements:string[]};imageCount:number;highlights:string[];warnings:string[];onGenerate:()=>void;onPublish:()=>void}){
  if(step==='analyzing'||step==='generating')return <section className="ai-processing"><div className="scan-orb"><Sparkles/></div><div><p className="eyebrow">LOCAT AI · {step==='analyzing'?'VISION':'RÉDACTION'}</p><h2>{step==='analyzing'?'Analyse des photos...':'Création de votre annonce...'}</h2><p>{step==='analyzing'?'Les images sont examinées pour identifier les éléments visibles.':'Analyse des informations du logement · Synthèse des observations · Rédaction de l'annonce'}</p></div><div className="shimmer"><i/><i/><i/></div></section>
  
  return <section className="ai-result"><div className="ai-result-head"><div><p className="eyebrow">LOCAT AI VISION</p><h2>{step==='analysis'?'Analyse terminée':'Annonce générée'}</h2></div><Badge tone="ai-badge">AI</Badge></div>{step==='analysis'?<>{vision.detectedSpaces.length>0&&<div className="observations"><b>Espaces détectés</b>{vision.detectedSpaces.map(x=><span key={x}><Check/> {x}</span>)}</div>}{vision.visibleFeatures.length>0&&<div className="observations"><b>Éléments visibles</b>{vision.visibleFeatures.map(x=><span key={x}><Check/> {x}</span>)}</div>}{vision.uncertainElements.length>0&&<div className="observations"><b>Incertitudes</b>{vision.uncertainElements.map(x=><span className="uncertain" key={x}><CircleAlert/> {x}</span>)}</div>}<div className="analysis-foot"><span>{imageCount} photo{imageCount>1?'s':''} analysée{imageCount>1?'s':''} · {vision.detectedSpaces.length+vision.visibleFeatures.length+vision.uncertainElements.length} observations</span><b>Observations visuelles</b></div><p className="disclaimer">Les observations sont basées uniquement sur les éléments visibles dans les photos.</p><button className="primary" onClick={onGenerate}>Générer l'annonce <ChevronRight/></button></>:<div className="listing-editor"><label htmlFor="listing-title">Titre</label><input id="listing-title" value={title} onChange={e=>setTitle(e.target.value)}/><label htmlFor="listing-description">Description</label><textarea id="listing-description" value={description} onChange={e=>setDescription(e.target.value)}/><div className="listing-facts"><b>Caractéristiques</b><span>{typeLabels[property.type]} · {property.surface} m² · {formatCfa(property.rent)} / mois · {property.meuble?'Meublé':'Non meublé'} · {property.commune}</span></div><div className="highlight-pills">{highlights.map(x=><Badge key={x} tone="success">{x}</Badge>)}</div>{warnings.length>0&&<p className="warning"><CircleAlert/> {warnings[0]}</p>}<div className="editor-actions"><button className="secondary">Modifier</button><button className="primary" onClick={onPublish}>Publier maintenant <ChevronRight/></button></div></div>}</section>
}

export function Loyers(){
  const [selected,setSelected]=useState<Reminder|null>(null)
  const [sent,setSent]=useState<string[]>([])
  
  // 🔴 P0.4 - Calcul dynamique des retards
  const lateReminders = reminders.filter(r => r.status === 'retard')
  const onTimeReminders = reminders.filter(r => r.status !== 'retard')
  const lateCount = lateReminders.length
  const onTimeCount = onTimeReminders.length
  
  useEffect(()=>{
    try{
      setSent(JSON.parse(localStorage.getItem('locat-sent-reminders')||'[]'))
    }catch{
      setSent([])
    }
  },[])
  
  const markSent=(id:string)=>{
    setSent(current=>{
      const next=current.includes(id)?current:[...current,id]
      localStorage.setItem('locat-sent-reminders',JSON.stringify(next))
      return next
    })
    setSelected(null)
  }
  
  return <Shell><section className="page-head"><p className="eyebrow">SUIVI DES PAIEMENTS</p><h1>Loyers</h1><p>{reminders.length} locataires · {onTimeCount} à jour · {lateCount} en retard</p></section><div className="rent-summary"><div><span>Total encaissé</span><b>3 850 000 FCFA</b></div><div><span>En attente</span><b>450 000 FCFA</b></div><div><span>Retards à traiter</span><b className="danger">{lateCount} dossier{lateCount>1?'s':''}</b></div></div><div className="rent-list"><div className="rent-table-head"><span>Locataire</span><span>Logement</span><span>Loyer</span><span>Statut</span><span>Retard</span><span>Action</span></div>{reminders.map(r=><div className={'rent-row '+(r.status==='retard'?'late':'')} key={r.id}><div><b>{r.tenant}</b><small className="mobile-only">{r.property}</small></div><span>{r.property}</span><span>{formatCfa(r.rent)}</span><Badge tone={r.status==='retard'?'danger':'success'}>{r.status==='retard'?'Impayé':'À jour'}</Badge><span className={r.lateDays?'danger':''}>{r.lateDays?r.lateDays+' jours':'—'}</span><div>{r.status==='retard'?(sent.includes(r.id)?<Badge tone="success"><Check/> Relance envoyée</Badge>:<button className="secondary small" onClick={()=>setSelected(r)}><Sparkles/> Relancer avec Locat AI</button>):<span className="muted">Aucune action</span>}</div></div>)}</div>{selected&&<ReminderPanel reminder={selected} onClose={()=>setSelected(null)} onSent={()=>markSent(selected.id)}/>}</Shell>
}

function ReminderPanel({reminder,onClose,onSent}:{reminder:Reminder;onClose:()=>void;onSent:()=>void}){
  const [tone,setTone]=useState<'respectueux'|'ferme'>('respectueux')
  const [message,setMessage]=useState('')
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState('')
  const [generated,setGenerated]=useState(false)
  
  const generate=async()=>{
    if(loading)return
    setLoading(true)
    setError('')
    try{
      const response=await fetch('/api/ai/rent-reminder',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({paymentId:reminder.id,tone})
      })
      const payload=await response.json()
      if(!response.ok)throw new Error(payload.error||'Impossible de générer la relance.')
      setMessage(payload.result.message)
      setGenerated(true)
    }catch(error){
      setError(error instanceof Error?error.message:'Impossible de générer la relance.')
    }finally{
      setLoading(false)
    }
  }
  
  return <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}><aside className="reminder-panel" aria-labelledby="reminder-title"><button className="close" onClick={onClose} aria-label="Fermer"><X/></button><p className="eyebrow">LOCAT AI · RELANCE</p><h2 id="reminder-title">Relancer avec Locat AI</h2><div className="context"><b>{reminder.tenant}</b><span>{reminder.property}</span><span>Loyer : {formatCfa(reminder.rent)}</span><span>Retard : {reminder.lateDays} jours</span></div><Badge tone="ai-badge"><Sparkles/> Proposition IA · validation humaine</Badge><label>Ton de la relance</label><div className="tone-toggle">{(['respectueux','ferme'] as const).map(t=><button type="button" className={tone===t?'selected':''} onClick={()=>setTone(t)} key={t}>{t[0].toUpperCase()+t.slice(1)}</button>)}</div>{error&&<p className="danger" role="alert">{error}</p>}{generated&&<><label htmlFor="reminder-message">Message proposé par Locat AI</label><textarea id="reminder-message" value={message} onChange={e=>setMessage(e.target.value)} maxLength={1500}/></>}<div className="panel-actions">{generated&&<button className="secondary" type="button" onClick={generate} disabled={loading}>{loading?'Génération...':'Régénérer'}</button>}{!generated?<button className="primary" type="button" onClick={generate} disabled={loading}>{loading?'Locat AI prépare votre relance...':'Générer avec Locat AI'}</button>:<button className="primary" type="button" onClick={onSent} disabled={loading||!message.trim()}>Valider l'envoi</button>}</div></aside></div>
}

export function Annonces(){
  const [items,setItems]=useState<Listing[]>([])
  useEffect(()=>{setItems(getPublicListings())},[]); 
  
  return <Shell publicView><section className="public-hero"><p className="eyebrow">LOCAT · VITRINE IMMOBILIÈRE</p><h1>Annonces disponibles</h1><p>Découvrez les logements actuellement proposés par les gestionnaires Locat.</p></section>{items.length===0?<div className="empty-state"><h2>Aucune annonce publiée</h2><p>Publiez votre premier logement pour le rendre visible ici.</p><Link href="/logements" className="primary">Voir les logements</Link></div>:<div className="public-grid">{items.map(item=>{const p=getProperty(item.propertyId); if(!p)return null; return <Link className="public-card" href={'/annonces/'+item.id} key={item.id}><div className="public-photo"><img src={p.photos[0]} alt={item.title}/><Badge tone="published"><Check/> Publié</Badge></div><div className="public-card-body"><p>{item.location.neighborhood}, {item.location.city}</p><h2>{item.title}</h2><b>{formatCfa(item.price)} <small>/ mois</small></b><span>{p.surface} m² · {p.meuble?'Meublé':'Non meublé'}</span></div></Link>})}</div>}</Shell>
}

export function PublicDetail({id}:{id:string}){
  const [listing,setListing]=useState<Listing|null>(null)
  const [show,setShow]=useState(false)
  const [showContact, setShowContact] = useState(false) // 🔴 P0.6 - Modal contact
  const [contactForm, setContactForm] = useState({name:'',phone:'',message:''})
  const [contactSent, setContactSent] = useState(false)
  
  useEffect(()=>{setListing(findStoredListing(id))},[id])
  
  if(!listing){
    return <Shell publicView><div className="empty-state"><h2>Annonce introuvable</h2><Link href="/annonces" className="primary">Retour aux annonces</Link></div></Shell>
  }
  
  const p=getProperty(listing.propertyId)
  if(!p)return null
  
  // 🔴 P0.6 - Fonction envoi contact
  const handleContact = () => {
    try {
      const contacts = JSON.parse(localStorage.getItem('locat-contact-requests') || '[]')
      contacts.push({
        ...contactForm,
        listingId: id,
        propertyId: listing.propertyId,
        date: new Date().toISOString()
      })
      localStorage.setItem('locat-contact-requests', JSON.stringify(contacts))
      setContactSent(true)
      setTimeout(() => {
        setShowContact(false)
        setContactSent(false)
        setContactForm({name:'',phone:'',message:''})
      }, 2000)
    } catch (error) {
      alert('Impossible d'enregistrer votre demande.')
    }
  }
  
  return <Shell publicView><Link href="/annonces" className="back">← Toutes les annonces</Link><div className="public-detail"><div className="public-hero-image"><img src={p.photos[0]} alt={listing.title}/></div><div className="public-copy"><p className="eyebrow">{p.structure} · {p.commune}</p><h1>{listing.title}</h1><strong className="big-rent">{formatCfa(listing.price)} <small>/ mois</small></strong><div className="facts"><span>{p.surface} m²</span><span>{typeLabels[p.type]}</span><span>{p.meuble?'Meublé':'Non meublé'}</span></div><h2>Description</h2><p>{listing.description}</p><h2>Points forts</h2><div className="highlight-pills">{listing.highlights.map(x=><Badge tone="success" key={x}>{x}</Badge>)}</div><button className="primary contact" onClick={()=>setShowContact(true)}>Contacter le gestionnaire</button><button className="ai-accordion" onClick={()=>setShow(!show)}><Sparkles/> Voir l'analyse Locat AI <ChevronRight/></button>{show&&<div className="public-analysis"><b>Photos analysées</b><span>{p.photos.length} photo{p.photos.length>1?'s':''} · Observations visibles</span><b>Éléments incertains</b><span>État exact des murs</span></div>}</div></div>{showContact&&<div className="overlay" onClick={e=>e.target===e.currentTarget&&setShowContact(false)}><div className="reminder-panel"><button className="close" onClick={()=>setShowContact(false)} aria-label="Fermer"><X/></button><p className="eyebrow">CONTACT GESTIONNAIRE</p><h2>Envoyer une demande</h2>{!contactSent?<><label>Votre nom<input value={contactForm.name} onChange={e=>setContactForm({...contactForm,name:e.target.value})} required/></label><label>Téléphone<input value={contactForm.phone} onChange={e=>setContactForm({...contactForm,phone:e.target.value})} required/></label><label>Message<textarea value={contactForm.message} onChange={e=>setContactForm({...contactForm,message:e.target.value})} minLength={10} required/></label><button className="primary" onClick={handleContact} disabled={!contactForm.name||!contactForm.phone||!contactForm.message||contactForm.message.length<10}>Envoyer</button></>:<div style={{textAlign:'center',padding:'2rem'}}><Check style={{width:'48px',height:'48px',color:'var(--success)',margin:'0 auto 1rem'}}/><h3>Demande enregistrée</h3><p>Le gestionnaire vous contactera prochainement.</p></div>}</div></div>}</Shell>
}

export default function Page(){
  const pathname=usePathname()
  if(pathname==='/logements')return <Logements/>
  if(pathname==='/loyers')return <Loyers/>
  if(pathname==='/annonces')return <Annonces/>
  if(pathname.startsWith('/logements/'))return <PropertyDetail id={pathname.split('/')[2]}/>
  if(pathname.startsWith('/annonces/'))return <PublicDetail id={pathname.split('/')[2]}/>
  return <Dashboard/>
}
