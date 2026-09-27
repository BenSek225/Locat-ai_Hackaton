# 🏠 Locat AI

**Une IA qui aide les gestionnaires locatifs à transformer les photos de logements et les retards de loyer en actions concrètes.**

![GOMYCODE × NVIDIA Hackathon 2026](https://img.shields.io/badge/GOMYCODE%20%C3%97%20NVIDIA-Hackathon%202026-orange)
![Next.js](https://img.shields.io/badge/Next.js-16.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-cyan)

---

## 📋 Problème

Les gestionnaires immobiliers en Afrique passent énormément de temps sur des tâches répétitives :

- 📸 **Création manuelle d'annonces** — Analyser les photos, décrire les logements, rédiger les annonces
- 💰 **Relances de loyers impayés** — Contacter les locataires en retard, personnaliser les messages
- 📊 **Dispersion des informations** — Jongler entre plusieurs outils sans vision d'ensemble

**Résultat** : Perte de temps, annonces peu attractives, gestion réactive plutôt que proactive.

---

## ✨ Solution : Locat AI

Locat AI est une plateforme de gestion locative intelligente qui utilise l'IA pour automatiser les tâches chronophages tout en gardant l'humain au contrôle.

### 🎯 Fonctionnalités principales

#### 1. 🔍 Vision AI — Analyse automatique des photos
- **Analyse visuelle des logements** via NVIDIA Vision AI
- **Détection automatique** : salon, cuisine, balcon, sol, luminosité
- **Identification des incertitudes** : état des murs, éléments non visibles
- **Observations fiables** basées uniquement sur ce qui est visible

#### 2. 📝 Génération d'annonces intelligentes
- **Génération automatique** d'annonces immobilières à partir des analyses Vision
- **Respect des données métier** : surface, loyer, localisation (pas d'invention)
- **Modification humaine** : le gestionnaire peut éditer avant publication
- **Publication immédiate** vers la vitrine publique

#### 3. 💬 Relances de loyer contextuelles
- **Génération de messages personnalisés** pour les retards de paiement
- **Choix du ton** : respectueux ou ferme selon le contexte
- **Contexte métier intégré** : nom, montant, durée du retard
- **Validation humaine obligatoire** avant envoi

#### 4. 📊 Dashboard intelligent
- **Vue d'ensemble** du portefeuille immobilier
- **Statistiques en temps réel** : logements libres/occupés, retards, revenus
- **Suggestions IA proactives** : logements sans annonce, retards à traiter
- **Activité récente** : paiements, retards, annonces générées

---

## 🛠️ Stack technique

### Frontend & Core
- **Next.js 16.3** — Framework React avec App Router
- **React 19** — Library UI avec Server Components
- **TypeScript 5.7** — Typage statique complet
- **Tailwind CSS 4.3** — Design system moderne + CSS custom properties
- **Lucide React 1.16** — Icônes modulaires (~40 icônes utilisées)
- **shadcn/ui** — Composants accessibles (Button)
- **class-variance-authority** — Gestion des variants CSS

### AI & Backend
- **NVIDIA AI** — Vision et génération de texte *(configuration pour API réelle)*
- **Mock AI Provider** — Fallback complet pour démo sans API key
- **Next.js API Routes** — Backend serverless (futures routes `/api/ai/*`)
- **Edge Runtime ready** — Compatible Vercel Edge Functions

### Déploiement & Analytics
- **Vercel** — Hébergement avec déploiement automatique depuis GitHub
- **Vercel Analytics** — Suivi des performances en production
- **pnpm 12** — Gestionnaire de paquets rapide

### Photos & Assets
- **Unsplash** — Photos immobilières réelles (3 images haute qualité)
- **SVG custom** — Icônes et logos Locat AI

---

## 🏗️ Architecture

### Structure du projet
```
locat-ai-app/
├── app/
│   ├── page.tsx                # ⭐ Composant principal (tous les workflows)
│   │                           # Dashboard, Logements, Loyers, Annonces
│   ├── layout.tsx              # Layout global + metadata
│   ├── globals.css             # Styles globaux
│   ├── logements/[id]/         # Routes dynamiques (proxy vers page.tsx)
│   ├── annonces/               # Routes publiques (proxy vers page.tsx)
│   └── loyers/                 # Route loyers (proxy vers page.tsx)
├── lib/
│   ├── ai-provider.ts          # Interface IA (NVIDIA + Mock fallback)
│   ├── mock-data.ts            # Données cohérentes (6 logements, 6 locataires)
│   └── utils.ts                # Utilitaires (cn pour Tailwind)
├── components/
│   └── ui/
│       └── button.tsx          # Composant Button shadcn/ui
├── public/                     # Assets statiques + images
└── package.json                # Next.js 16 + TypeScript + Tailwind
```

### Architecture applicative unique

**Single Page Component Architecture** — Tout le code UI est dans `app/page.tsx` (~500 lignes) :

```typescript
// app/page.tsx contient TOUS les composants :
- Shell          // Header + Navigation
- Dashboard      // Page d'accueil
- Logements      // Liste des logements
- PropertyDetail // Détail + Vision AI + Génération annonce
- Loyers         // Gestion des loyers
- ReminderPanel  // Génération de relances
- Annonces       // Vitrine publique
- PublicDetail   // Détail d'une annonce publique
```

**Routing** : Next.js App Router avec routes proxy qui importent depuis `page.tsx`

**State** : React hooks locaux (useState) — Pas de Redux/Context (prototype)

**Data** : Mock data importées depuis `lib/mock-data.ts` — Pas de DB (hackathon)

---

## 🤖 Comment l'IA est utilisée

### 1. Vision AI (Analyse d'images)
**Rôle** : Observer les photos de logements et identifier les éléments visibles  
**Modèle** : NVIDIA Vision AI (ou mock équivalent)  
**Input** : Photos du logement (1-3 images)  
**Output** : Liste d'observations + liste d'incertitudes  
**Fallback** : Mock AI avec données cohérentes si API indisponible

**Exemple** :
```typescript
{
  visibleFeatures: ['Salon lumineux', 'Cuisine ouverte', 'Balcon visible'],
  uncertainElements: ['État exact des murs']
}
```

### 2. Listing AI (Génération d'annonces)
**Rôle** : Rédiger une annonce immobilière à partir des données métier + analyse Vision  
**Modèle** : NVIDIA LLM (ou mock équivalent)  
**Input** : Données logement + résultats Vision AI  
**Output** : Titre + description + points forts  
**Contrainte** : Ne génère que le texte, les données métier restent la source de vérité

**Exemple** :
```typescript
{
  title: '2 pièces lumineux à Cocody',
  description: 'Découvrez ce bel appartement baigné de lumière...',
  highlights: ['Salon lumineux', 'Cuisine ouverte', 'Balcon visible']
}
```

### 3. Reminder AI (Relances de loyer)
**Rôle** : Générer un message de relance personnalisé  
**Modèle** : NVIDIA LLM (ou mock équivalent)  
**Input** : Contexte locataire (nom, montant, retard) + ton souhaité  
**Output** : Message personnalisé prêt à envoyer  
**Human-in-the-loop** : Le gestionnaire valide/modifie avant envoi

---

## 🎨 IA responsable & données

### Principes
✅ **Données métier = source de vérité** — L'IA ne modifie jamais les loyers, surfaces, localisations  
✅ **Observations basées sur le visible** — Vision AI ne spécule pas  
✅ **Humain dans la boucle** — Validation obligatoire avant publication/envoi  
✅ **Transparence** — Les contenus générés par IA sont clairement identifiés  
✅ **Fallback robuste** — Mock AI permet la démo sans dépendance externe

### Gestion des incertitudes
Quand Vision AI n'est pas certain d'une observation (ex: état des murs), l'incertitude est clairement affichée et le texte généré l'évite ou la mentionne explicitement.

---

## 🚀 Installation locale

### Prérequis
- Node.js 18+ ou pnpm 12+
- Git

### Étapes
```bash
# Cloner le repository
git clone https://github.com/BenSek225/Locat-ai_Hackaton.git
cd Locat-ai_Hackaton/locat-ai-app

# Installer les dépendances
npm install
# ou
pnpm install

# Lancer le serveur de développement
npm run dev
# ou
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 🌍 Démo en ligne

🔗 **URL de production** : [À compléter après déploiement Vercel final]

---

## 🎬 Parcours de démonstration

### Scénario 1 : Générer une annonce avec Vision AI (parcours complet)
1. **Dashboard** → Voir carte "1 logement libre sans annonce"
2. **Cliquer** "Analyser le logement" → Redirige vers `/logements/a02`
3. **Logement A02** (2 pièces, 55m², 250 000 FCFA, 3 photos)
4. **Cliquer** "Analyser avec Locat AI"
5. **Vision AI** analyse les 3 photos (simulation 2-3 secondes avec animation)
6. **Résultats affichés** :
   - ✅ Espaces détectés : Salon, Cuisine, Balcon
   - ✅ Éléments visibles : Salon lumineux, Cuisine ouverte, Balcon visible, Sol carrelé
   - ⚠️ Incertitudes : État exact des murs
7. **Cliquer** "Générer l'annonce"
8. **Listing AI** rédige l'annonce (simulation 2-3 secondes)
9. **Annonce générée affichée** :
   - Titre : "2 pièces lumineux à Cocody"
   - Description complète basée sur Vision + données métier
   - Points forts : Salon lumineux, Cuisine ouverte, Balcon visible
   - ⚠️ Avertissement : "État des murs non déterminé avec certitude"
10. **Possibilité de modifier** titre et description
11. **Cliquer** "Publier maintenant"
12. **Redirection automatique** vers `/annonces`
13. **Annonce visible immédiatement** dans la vitrine publique

### Scénario 2 : Générer une relance de loyer (parcours complet)
1. **Dashboard** → Voir carte "2 loyers en retard"
2. **Cliquer** "Voir les retards" → Redirige vers `/loyers`
3. **Liste affichée** : 6 locataires (4 à jour, 2 en retard)
4. **Identifier Marie N'Guessan** :
   - Logement : B03 · Cour familiale Bamba
   - Loyer : 420 000 FCFA
   - Statut : **Impayé** (badge rouge)
   - Retard : **30 jours** (texte rouge)
5. **Cliquer** "Générer une relance"
6. **Panel latéral s'ouvre** avec contexte complet
7. **Choisir le ton** : "Respectueux" ou "Ferme" (toggle)
8. **Message généré automatiquement** par Reminder AI :
   ```
   Bonjour Marie N'Guessan,
   
   Nous vous rappelons que votre loyer de 420 000 FCFA 
   présente actuellement 30 jours de retard.
   
   Merci de bien vouloir régulariser votre situation.
   
   Cordialement,
   Locat
   ```
9. **Possibilité de modifier** le message
10. **Cliquer** "Régénérer" pour ajouter une phrase de disponibilité
11. **Cliquer** "Valider l'envoi"
12. **Panel se ferme**
13. **Badge "✓ Enregistrée"** remplace le bouton de relance

### Scénario 3 : Navigation vitrine publique
1. **Aller à** `/annonces` (accessible depuis le header)
2. **Vitrine publique affichée** : 2 annonces disponibles
3. **Cliquer** sur une annonce (ex: Studio B01)
4. **Page détail** `/annonces/b01` :
   - Photo principale
   - Prix, surface, caractéristiques
   - Description complète
   - Points forts (badges verts)
   - Bouton "Contacter le gestionnaire" (placeholder)
   - Accordéon "Voir l'analyse Locat AI" (affiche observations Vision)

---

## 🎥 Script vidéo 90 secondes (chronométré)

**[0-10s] — Hook + Problème**
> "En Afrique, créer une annonce immobilière prend des heures. Photos, description, mise en ligne... Et les relances de loyers ? Encore plus de temps perdu."

**[10-25s] — Solution + Dashboard**
> "Locat AI automatise ces tâches. Voici le dashboard d'un gestionnaire. 24 logements, 3 libres, 2 retards. L'IA détecte 1 logement libre sans annonce."

**[25-45s] — Vision AI en action**
> "Je clique. Locat AI analyse les 3 photos. Salon lumineux. Cuisine ouverte. Balcon visible. L'IA indique aussi les incertitudes : état des murs inconnu."

**[45-60s] — Génération annonce**
> "Je génère l'annonce. Locat AI rédige le titre, la description, les points forts. Je peux modifier. Je publie. L'annonce est immédiatement visible."

**[60-75s] — Reminder AI**
> "Même chose pour les retards. Marie, 30 jours. Je génère une relance. Ton respectueux ou ferme. L'IA personnalise. Je valide."

**[75-90s] — Impact + Next steps**
> "Résultat : ce qui prenait 2 heures prend 2 minutes. L'IA propose, l'humain décide. Prochaine étape : intégration WhatsApp, Mobile Money, base de données. Locat AI, gestion locative intelligente pour l'Afrique."

---

---

## 📊 Données mock cohérentes

Le prototype utilise un jeu de données fictives mais **rigoureusement cohérentes** pour démontrer tous les workflows :

### Portefeuille immobilier (6 logements)
- **A02** — 2 pièces, 55m², 250 000 FCFA, **LIBRE** → Candidat idéal pour démo Vision AI
- **A01** — Studio, 32m², 180 000 FCFA, Occupé (Jean Kouassi)
- **B03** — 3 pièces, 78m², 420 000 FCFA, Occupé (Marie N'Guessan, **30 jours de retard**)
- **B01** — Studio, 28m², 150 000 FCFA, Libre, **Annonce publiée**
- **H04** — Villa, 140m², 750 000 FCFA, Occupé (Paul Yao)
- **H02** — 2 pièces, 60m², 290 000 FCFA, Libre, **Annonce publiée**

### Relations cohérentes
✅ Chaque paiement → bon locataire → bon logement  
✅ Logements libres → pas de locataire actif  
✅ Logements occupés → locataire + contrat cohérent  
✅ Retards → dates calculées correctement  
✅ Annonces publiées → logements réels avec photos

### Scénario de démonstration
- **Dashboard** : 24 logements, 3 libres, 2 retards
- **Logement A02** : Libre, 3 photos réelles (Unsplash), prêt pour Vision AI
- **Marie N'Guessan** : Retard de 30 jours (420 000 FCFA) → Démo Reminder AI
- **Annonces** : 2 annonces publiées visibles sur la vitrine publique

---

## ⚠️ Limitations actuelles

### Prototype hackathon
Ce projet est un **prototype fonctionnel** développé pour le hackathon GOMYCODE × NVIDIA 2026.

**Non inclus dans cette version** :
- ❌ Authentification utilisateur réelle
- ❌ Base de données persistante (Supabase, PostgreSQL)
- ❌ Envoi réel de messages (WhatsApp, SMS, Email)
- ❌ Paiement en ligne
- ❌ Gestion multi-gestionnaires
- ❌ Analytics avancées

**Inclus et fonctionnel** :
- ✅ Workflows IA complets (Vision, Listing, Reminder)
- ✅ Interface responsive et moderne
- ✅ Gestion du portefeuille immobilier
- ✅ Publication d'annonces
- ✅ Suivi des loyers
- ✅ Mock AI robuste pour la démo

---

## 🔮 Prochaines étapes

### Phase 1 — Post-hackathon immédiat
- Intégration NVIDIA API réelle (si accès validé)
- Persistence des données (localStorage → Supabase)
- Tests utilisateurs avec gestionnaires réels

### Phase 2 — MVP commercial
- Authentification multi-utilisateurs
- Base de données production
- Intégration paiements (Mobile Money, Orange Money)
- Envoi réel de messages (WhatsApp Business API)

### Phase 3 — Scale
- Gestion multi-structures
- Rapports financiers avancés
- Application mobile (React Native)
- Marketplace locatif inter-gestionnaires

---

## 👥 Équipe

**Bienvenu Sekongo**  
Développeur Full-Stack  
📧 bienvenusekongo9@gmail.com  
🇨🇮 Abidjan, Côte d'Ivoire

---

## 🏆 Hackathon GOMYCODE × NVIDIA 2026

**Thème** : Build with Any AI — Real-World Impact  
**Date** : 27 septembre 2026  
**Awards visés** :
- 🥇 Country Podium (Côte d'Ivoire)
- 🤖 Guepard — AI Automation Award
- 🎨 EY Studio+ — Human-Centred Innovation Award
- 🌍 DigiFemmes + Impact Hub — Catalyse Inclusive Impact Award
- ⚡ Artefact — Data & AI Award

---

## 📄 Licence

MIT — Projet open-source développé pour le hackathon GOMYCODE × NVIDIA 2026.

---

## 🙏 Remerciements

- **GOMYCODE** pour l'organisation du hackathon
- **NVIDIA** pour les outils IA
- **Unsplash** pour les photos de démonstration
- **Vercel** pour l'hébergement
- La communauté des gestionnaires immobiliers qui ont inspiré ce projet

---

**Construit avec ❤️ en Côte d'Ivoire pour faciliter la gestion locative en Afrique.**
