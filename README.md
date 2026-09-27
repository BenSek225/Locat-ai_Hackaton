# Locat AI

> Une déclinaison web expérimentale de **Locat**, une solution de gestion locative pensée pour simplifier le quotidien des gestionnaires et des locataires en Côte d'Ivoire.

**GOMYCODE × NVIDIA — Come Build with AI · Hackathon 2026**

- 📦 [GitHub — Locat AI Hackathon](https://github.com/BenSek225/Locat-ai_Hackaton)
- 📱 [Projet principal — Locat Mobile](https://github.com/BenSek225/Locat-Mobile)
- 🌐 [Demo Live](https://locat-ai-hackaton.vercel.app)

---

## Table des matières

1. [À propos de Locat](#1-à-propos-de-locat)
2. [Pourquoi ce prototype pour le hackathon ?](#2-pourquoi-ce-prototype-pour-le-hackathon)
3. [Le problème](#3-le-problème)
4. [La solution — Locat AI](#4-la-solution--locat-ai)
5. [Ce que nous avons adapté pour le hackathon](#5-ce-que-nous-avons-adapté-pour-le-hackathon)
6. [Expérience principale du prototype](#6-expérience-principale-du-prototype)
7. [Fonctionnalités du prototype](#7-fonctionnalités-du-prototype)
8. [Démonstration](#8-démonstration)
9. [Architecture technique](#9-architecture-technique)
10. [Technologies utilisées](#10-technologies-utilisées)
11. [Utilisation de l'IA dans le produit](#11-utilisation-de-lia-dans-le-produit)
12. [Transparence sur l'IA et les outils](#12-transparence-sur-lia-et-les-outils)
13. [Données](#13-données)
14. [Tests et fiabilité](#14-tests-et-fiabilité)
15. [Limitations connues](#15-limitations-connues)
16. [IA responsable et supervision humaine](#16-ia-responsable-et-supervision-humaine)
17. [Sécurité](#17-sécurité)
18. [Installation](#18-installation)
19. [Déploiement](#19-déploiement)
20. [Structure du projet](#20-structure-du-projet)
21. [Roadmap](#21-roadmap)
22. [Relation avec Locat Mobile](#22-relation-avec-locat-mobile)
23. [Équipe](#23-équipe)
24. [Hackathon](#24-hackathon)
25. [Licence](#25-licence)

---

## 1. À propos de Locat

**Locat** est un projet de gestion locative plus large conçu pour centraliser les opérations quotidiennes liées à la location immobilière en Côte d'Ivoire.

La vision initiale du projet est de proposer une plateforme accessible aux gestionnaires et aux locataires, en réunissant dans un même écosystème :

- 🏢 la gestion des structures et des logements
- 👥 la gestion des locataires et des contrats
- 💰 le suivi des paiements et des loyers
- 🔔 les rappels et notifications
- 📄 les quittances et documents
- 📊 les rapports de gestion
- 💳 les paiements adaptés au contexte ivoirien (Mobile Money)
- 🤖 et, à terme, des fonctionnalités d'automatisation et d'intelligence artificielle

Le projet principal est développé sous la forme d'une application mobile avec **React Native / Expo**, **TypeScript** et **Supabase**, avec des parcours distincts pour les gestionnaires et les locataires.

**Le dépôt principal est disponible ici :**  
📱 [Locat Mobile](https://github.com/BenSek225/Locat-Mobile)

---

## 2. Pourquoi ce prototype pour le hackathon ?

Pour le hackathon **GOMYCODE × NVIDIA**, nous avons volontairement réduit le périmètre de Locat afin de nous concentrer sur une expérience très précise : **transformer des tâches répétitives de gestion locative en workflows assistés par IA**.

Plutôt que de reproduire l'ensemble du produit Locat, ce prototype web isole deux workflows particulièrement adaptés à une démonstration courte :

### Workflow 1 — Logement → annonce avec Locat AI

Un gestionnaire possède un logement disponible et ses photos.

**Locat AI permet de :**

1. Sélectionner le logement
2. Analyser ses photos
3. Identifier des éléments visuellement observables
4. Distinguer les observations certaines des éléments incertains
5. Générer automatiquement une annonce
6. Présenter les caractéristiques métier du logement
7. Laisser le gestionnaire modifier le contenu
8. Publier immédiatement l'annonce

### Workflow 2 — Retard de loyer → relance avec Locat AI

Lorsqu'un loyer est en retard, le gestionnaire peut :

1. Identifier le dossier concerné
2. Demander à Locat AI de préparer une relance
3. Choisir un ton (respectueux ou ferme)
4. Obtenir un message contextualisé
5. Modifier le message si nécessaire
6. Valider manuellement son envoi

**L'objectif du prototype n'est donc pas de démontrer toute la plateforme Locat, mais de montrer comment l'IA peut s'intégrer directement dans des opérations métier concrètes.**

---

## 3. Le problème

La gestion locative comporte de nombreuses tâches répétitives qui demandent du temps sans nécessairement nécessiter une intervention humaine complexe.

**Parmi elles :**

- 📸 Analyser des photos pour comprendre rapidement les caractéristiques visibles d'un logement
- ✍️ Rédiger des annonces immobilières cohérentes à partir d'informations dispersées
- 🔄 Reformuler les mêmes informations pour différents contextes
- 💬 Préparer manuellement des messages de relance lorsque les loyers sont en retard
- 🎯 Conserver une cohérence entre les informations du portefeuille immobilier et les informations publiées

Pour un petit gestionnaire ou une structure immobilière disposant de moyens limités, ces tâches peuvent être réalisées manuellement et de manière répétitive.

**Le problème traité par ce prototype est donc simple :**

> **Comment permettre à un gestionnaire immobilier de passer plus rapidement de ses données métier à une action exploitable, sans laisser l'IA inventer ou modifier les informations importantes ?**

---

## 4. La solution — Locat AI

Locat AI ajoute une couche d'assistance intelligente au-dessus des workflows de gestion locative.

**Le principe est volontairement simple :**

> **Les données métier restent la source de vérité, l'IA propose, et le gestionnaire garde le contrôle.**

Dans le prototype, cela se traduit par trois étapes principales :

### 👁️ Observer

Locat AI Vision analyse les images d'un logement et retourne des observations visuelles structurées :
- Espaces détectés (salon, cuisine, chambre, etc.)
- Éléments visibles (mobilier, équipements, finitions)
- Incertitudes (éléments non déterminés avec certitude)

### ✨ Générer

À partir des informations métier (surface, loyer, type, localisation) et des observations visuelles, Locat AI génère une proposition d'annonce :
- Titre attractif
- Description cohérente
- Points forts mis en avant
- Avertissements sur les incertitudes

### ✅ Valider

Le gestionnaire peut modifier le contenu généré avant publication. **Aucune publication automatique.**

Le même principe est utilisé pour les relances de loyers : l'IA prépare le message, mais la validation reste humaine.

---

## 5. Ce que nous avons adapté pour le hackathon

Le projet présenté ici ne remplace pas Locat Mobile.

Il s'agit d'un **prototype web construit spécifiquement pour le hackathon** afin de démontrer rapidement les capacités d'IA appliquées à la gestion locative.

### 🌐 Locat — vision globale

La vision globale de Locat couvre notamment :

- Gestionnaire
- Locataire
- Structures
- Logements
- Contrats
- Paiements
- Quittances
- Rappels
- Notifications
- Rapports
- Gestion financière
- Mobile Money
- Automatisations futures

### 🎯 Locat AI — prototype hackathon

Le prototype présenté pendant le hackathon se concentre sur :

- Portefeuille immobilier
- Logements disponibles
- Analyse visuelle des photos (Vision AI)
- Génération d'annonces (Listing AI)
- Publication d'annonces
- Relances de loyers assistées par IA (Reminder AI)
- Contrôle humain avant action

**Cette réduction volontaire du périmètre permet de présenter une expérience complète dans le temps limité du hackathon tout en montrant une direction claire pour l'intégration future de l'IA dans Locat.**

---

## 6. Expérience principale du prototype

### Parcours A — Génération d'une annonce

```text
Dashboard
   ↓
Logement libre (A02, A01, B01, etc.)
   ↓
Détail du logement (photos + informations)
   ↓
[Bouton] Analyser avec Locat AI
   ↓
Analyse des photos (Vision AI)
   ↓
Observations visuelles structurées
   ↓
[Bouton] Générer l'annonce
   ↓
Annonce proposée + Caractéristiques dynamiques
   ↓
Modification humaine (titre, description)
   ↓
[Bouton] Publier maintenant
   ↓
Annonce publique visible sur /annonces
```

### Parcours B — Relance de loyer

```text
Dashboard ou page Loyers
   ↓
Identifier un retard (Marie N'Guessan, 30 jours)
   ↓
[Bouton] Relancer avec Locat AI
   ↓
Choisir le ton (respectueux / ferme)
   ↓
[Bouton] Générer avec Locat AI
   ↓
Message de relance proposé
   ↓
Modification humaine (optionnelle)
   ↓
[Bouton] Valider l'envoi
   ↓
Relance marquée comme envoyée
```

---

## 7. Fonctionnalités du prototype

### 🏠 Dashboard
- Vue d'ensemble du portefeuille immobilier
- Statistiques : nombre de logements, logements libres, loyers en retard
- Indicateurs de revenus (mockés pour la démo)
- Activité récente
- Section Locat AI avec suggestions intelligentes

### 🏢 Portefeuille de logements
- Liste complète des logements avec filtres (Tous / Libres / Occupés)
- Recherche par référence, structure ou commune
- Création d'un nouveau logement avec formulaire complet
- Sélection de photos de démonstration (4 photos disponibles)
- Informations : type, surface, loyer, statut, meublé, localisation

### 📸 Vision AI
- Analyse automatique des photos d'un logement
- Détection des espaces (salon, cuisine, chambre, salle de bain, etc.)
- Identification des éléments visibles (mobilier, équipements, finitions)
- Signalement des incertitudes (éléments non déterminés)
- Comptage dynamique des photos analysées

### ✍️ Génération d'annonces (Listing AI)
- Génération automatique de titre attractif
- Rédaction de description cohérente
- Extraction des points forts
- Avertissements sur les incertitudes
- Caractéristiques dynamiques du logement (type, surface, loyer, localisation)
- Édition avant publication

### 🌐 Vitrine publique
- Page `/annonces` listant toutes les annonces publiées
- Détail de chaque annonce avec photos et informations
- Modal de contact gestionnaire fonctionnel
- Stockage des demandes de contact dans localStorage

### 💰 Suivi des loyers
- Liste des locataires avec statut de paiement
- Indicateurs : nombre de locataires, à jour, en retard
- Affichage du nombre de jours de retard
- Compteurs dynamiques calculés depuis les données réelles

### 🤖 Reminder AI
- Génération de messages de relance contextualisés
- Choix du ton (respectueux ou ferme)
- Prévisualisation et modification du message
- Validation humaine avant envoi
- Historique des relances envoyées

### 💾 Persistance navigateur
- localStorage pour les nouveaux logements créés
- localStorage pour les annonces publiées
- localStorage pour les relances envoyées
- localStorage pour les demandes de contact
- Données conservées entre les sessions

---

## 8. Démonstration

### Scénario de démonstration (90 secondes)

**Point de départ :** Dashboard Locat AI

#### Partie 1 — Vision AI + Listing AI (50 secondes)

1. **Dashboard** → Clic sur "1 logement libre sans annonce" → Logement A02
2. **Détail logement A02** → Affichage des 3 photos + informations
3. **Clic "Analyser avec Locat AI"** → Analyse en cours (3 secondes)
4. **Résultat Vision** → Espaces détectés, éléments visibles, incertitudes
5. **Clic "Générer l'annonce"** → Génération en cours (3 secondes)
6. **Annonce générée** → Titre, description, caractéristiques dynamiques, points forts
7. **Modification rapide** (optionnel) → Ajustement du titre ou description
8. **Clic "Publier maintenant"** → Redirection vers `/annonces`
9. **Annonce visible** → A02 apparaît dans la liste publique

#### Partie 2 — Reminder AI (30 secondes)

1. **Navigation** → `/loyers` ou retour Dashboard → Section Loyers
2. **Identification** → Marie N'Guessan, 30 jours de retard
3. **Clic "Relancer avec Locat AI"** → Modal s'ouvre
4. **Sélection du ton** → "Respectueux" (par défaut)
5. **Clic "Générer avec Locat AI"** → Message généré (2 secondes)
6. **Prévisualisation** → Message contextuel avec nom, montant, retard
7. **Clic "Valider l'envoi"** → Badge "Relance envoyée" apparaît

#### Résultat final (10 secondes)

- Retour Dashboard → Statistiques mises à jour
- Annonce A02 publiée et visible
- Relance Marie N'Guessan envoyée

### URLs de démonstration

- **Dashboard :** `https://locat-ai-hackaton.vercel.app/`
- **Logements :** `https://locat-ai-hackaton.vercel.app/logements`
- **Logement A02 :** `https://locat-ai-hackaton.vercel.app/logements/a02`
- **Loyers :** `https://locat-ai-hackaton.vercel.app/loyers`
- **Annonces :** `https://locat-ai-hackaton.vercel.app/annonces`

### Workflow de secours (si NVIDIA indisponible)

Le prototype intègre un **MockAIProvider** qui simule les réponses de l'IA de manière cohérente :

- **Vision AI** → Retourne des observations prédéfinies adaptées au logement
- **Listing AI** → Génère une annonce basée sur les données métier
- **Reminder AI** → Produit un message de relance contextualisé

**Le workflow reste identique, seules les réponses proviennent du mock au lieu de NVIDIA.**

---

## 9. Architecture technique

```text
Next.js 16 (App Router)
 │
 ├── Frontend (React 19 + TypeScript)
 │   ├── Pages (/app/page.tsx)
 │   ├── Composants UI
 │   └── CSS personnalisé + Tailwind
 │
 ├── API Routes (Next.js Server)
 │   └── /app/api/ai/
 │       ├── property-analysis (Vision AI)
 │       ├── property-listing (Listing AI)
 │       └── rent-reminder (Reminder AI)
 │
 ├── AI Provider Layer
 │   ├── lib/ai/provider.ts (Sélection du provider)
 │   ├── lib/ai/nvidia-provider.ts (NVIDIA API)
 │   └── lib/ai/mock-provider.ts (Fallback)
 │
 ├── Storage Layer (Prototype)
 │   ├── lib/property-storage.ts (localStorage)
 │   ├── lib/listing-storage.ts (localStorage)
 │   └── lib/mock-data.ts (Données seed)
 │
 └── Validation & Schemas
     ├── lib/ai/schemas.ts (Zod schemas)
     └── lib/ai/http.ts (Helpers)
```

### Explication détaillée

#### Frontend

- **Pages :** Toutes les routes sont gérées dans `app/page.tsx` avec un routage côté client
- **Composants :** Shell, Dashboard, Logements, PropertyDetail, Loyers, Annonces, PublicDetail
- **État :** useState et useEffect pour la gestion locale
- **Style :** CSS personnalisé dans `globals.css` avec quelques utilitaires Tailwind

#### Routes API

Toutes les routes API sont **server-side only** et ne reçoivent jamais de secrets côté client.

**`/api/ai/property-analysis` (POST)**
- **Input :** `{ propertyId, property: { photos, ... } }`
- **Traitement :** Extraction des URLs photos, appel Vision AI
- **Output :** `{ result: { detectedSpaces, visibleFeatures, uncertainElements }, imageCount }`

**`/api/ai/property-listing` (POST)**
- **Input :** `{ propertyId, property, analysis }`
- **Traitement :** Fusion données métier + observations, appel Listing AI
- **Output :** `{ result: { title, description, highlights, warnings } }`

**`/api/ai/rent-reminder` (POST)**
- **Input :** `{ paymentId, tone: 'respectueux' | 'ferme' }`
- **Traitement :** Recherche du reminder, appel Reminder AI
- **Output :** `{ result: { message } }`

#### Validation

- **Schémas Zod** dans `lib/ai/schemas.ts` pour valider les sorties AI
- **Helpers HTTP** dans `lib/ai/http.ts` pour gérer les erreurs de façon uniforme
- **Validation des entrées** dans chaque route API

#### Stockage local du prototype

- **property-storage.ts :** Merge des logements seed + localStorage
- **listing-storage.ts :** Gestion des annonces publiées dans localStorage
- **mock-data.ts :** Données seed (6 logements, 6 reminders, analyses mockées)

**Clé localStorage :** `locat-properties-v1`, `locat-listings-v1`, `locat-sent-reminders`, `locat-contact-requests`

#### Provider IA

**Sélection automatique :**
```typescript
// lib/ai/provider.ts
if (process.env.NVIDIA_API_KEY && process.env.NVIDIA_MODEL) {
  return new NVIDIAProvider()
} else {
  return new MockAIProvider()
}
```

**NVIDIA Provider :**
- Construit les prompts avec contexte métier
- Envoie les requêtes à l'API NVIDIA
- Parse et valide les réponses JSON

**Mock Provider :**
- Simule les délais de traitement (500-1500ms)
- Retourne des réponses cohérentes avec les données d'entrée
- Permet de tester le workflow complet sans clé API

#### Fallback

Le fallback est transparent pour l'utilisateur :
- Pas de message d'erreur
- Workflow identique
- Réponses cohérentes et contextualisées

#### Relation logement → annonce

```text
Property (id: a02)
   ↓ (API analysis)
Vision Analysis
   ↓ (API listing)
Generated Listing
   ↓ (publishListing)
Listing (id: listing-a02, propertyId: a02)
   ↓
Public Page (/annonces/listing-a02)
```

---

## 10. Technologies utilisées

### Stack du prototype hackathon

| Technologie        | Version | Utilisation                          |
| ------------------ | ------- | ------------------------------------ |
| Next.js            | 16.3.3  | Application web (App Router)         |
| React              | 19      | Interface utilisateur                |
| TypeScript         | 5.7.3   | Typage statique                      |
| CSS personnalisé   | -       | Design et interface                  |
| Tailwind CSS       | 4.3.3   | Utilitaires CSS complémentaires      |
| Lucide React       | 1.16.0  | Icônes                               |
| NVIDIA AI          | -       | Génération / analyse IA (ou mock)    |
| Zod                | -       | Validation des schémas               |
| localStorage       | -       | Persistance du prototype (navigateur)|
| Vercel             | -       | Déploiement et hosting               |
| pnpm               | 12.3.4  | Gestionnaire de paquets              |

### Stack du projet Locat principal (mobile)

**Mentionné pour contexte, non utilisé dans ce prototype :**

| Technologie        | Utilisation dans Locat Mobile        |
| ------------------ | ------------------------------------ |
| React Native       | Application mobile cross-platform    |
| Expo               | Toolchain et SDK mobile              |
| TypeScript         | Typage statique                      |
| Supabase           | Backend (auth, DB, storage)          |
| PostgreSQL         | Base de données                      |
| React Navigation   | Navigation mobile                    |

**Le prototype hackathon est volontairement simplifié et n'utilise pas Supabase, PostgreSQL ou React Native.**

---

## 11. Utilisation de l'IA dans le produit

Le prototype intègre **trois workflows IA distincts**, chacun avec un rôle spécifique.

### 🔍 Vision AI

**Rôle :** Analyser les photos d'un logement et extraire des observations visuelles structurées.

**Modèle utilisé :** NVIDIA API (ou MockAI en fallback)

**Input :**
```json
{
  "images": [
    "https://example.com/photo1.jpg",
    "https://example.com/photo2.jpg",
    "https://example.com/photo3.jpg"
  ]
}
```

**Processing :**
- Analyse de chaque image (jusqu'à 3)
- Détection des espaces (salon, cuisine, chambre, etc.)
- Identification des éléments visibles (mobilier, équipements, finitions)
- Signalement des incertitudes (éléments non clairement identifiables)

**Output :**
```json
{
  "detectedSpaces": ["Salon", "Cuisine", "Chambre"],
  "visibleFeatures": [
    "Carrelage en bon état",
    "Fenêtres avec volets",
    "Plan de travail moderne"
  ],
  "uncertainElements": [
    "État des murs difficile à évaluer sur les photos"
  ]
}
```

**Validation :** Schéma Zod vérifie la structure de sortie

**Fallback :** MockAIProvider retourne des observations cohérentes basées sur le type de logement

**Limites :**
- Maximum 3 photos analysées
- Seules les URLs HTTP/HTTPS sont acceptées
- Pas de support pour les images base64 (Data URLs)
- Les observations sont basées uniquement sur ce qui est visible dans les photos

---

### ✨ Listing AI

**Rôle :** Générer une annonce immobilière à partir des données métier et des observations visuelles.

**Modèle utilisé :** NVIDIA API (ou MockAI en fallback)

**Input :**
```json
{
  "property": {
    "id": "a02",
    "numero": "A02",
    "type": "studio",
    "surface": 35,
    "rent": 200000,
    "status": "libre",
    "meuble": false,
    "description": "Studio moderne dans résidence sécurisée",
    "structure": {
      "nom": "Résidence Palm Beach",
      "commune": "Cocody",
      "ville": "Abidjan"
    }
  },
  "analysis": {
    "detectedSpaces": ["Salon-Chambre", "Cuisine américaine", "Salle d'eau"],
    "visibleFeatures": ["Carrelage en bon état", "Cuisine équipée"],
    "uncertainElements": ["État exact des murs"]
  }
}
```

**Processing :**
- Fusion des informations métier (surface, loyer, type, localisation)
- Intégration des observations visuelles
- Génération d'un titre attractif
- Rédaction d'une description cohérente
- Extraction des points forts
- Signalement des avertissements (incertitudes)

**Output :**
```json
{
  "title": "Studio moderne 35m² - Cocody, Résidence Palm Beach",
  "description": "Découvrez ce studio de 35m² situé dans la résidence sécurisée Palm Beach à Cocody. Le logement dispose d'un espace salon-chambre, d'une cuisine américaine équipée et d'une salle d'eau. Le carrelage est en bon état et l'ensemble offre un cadre de vie agréable.",
  "highlights": [
    "Résidence sécurisée",
    "Cuisine équipée",
    "Carrelage en bon état",
    "Quartier recherché de Cocody"
  ],
  "warnings": [
    "État exact des murs non déterminé avec certitude sur les photos"
  ]
}
```

**Validation :** Schéma Zod vérifie la structure de sortie

**Fallback :** MockAI génère une annonce basée sur le template et les données métier

**Limites :**
- L'IA ne modifie jamais les données métier (loyer, surface, type, localisation)
- Les caractéristiques affichées proviennent directement du property
- L'IA peut reformuler la description mais ne peut pas inventer d'informations

---

### 💬 Reminder AI

**Rôle :** Générer un message de relance personnalisé pour un loyer en retard.

**Modèle utilisé :** NVIDIA API (ou MockAI en fallback)

**Input :**
```json
{
  "tenant": "Marie N'Guessan",
  "property": "B03",
  "rent": 420000,
  "lateDays": 30,
  "tone": "respectueux"
}
```

**Processing :**
- Contextualisation avec le nom du locataire
- Mention du montant du loyer
- Indication du nombre de jours de retard
- Adaptation du ton selon le choix (respectueux ou ferme)
- Génération d'un message professionnel

**Output :**
```json
{
  "message": "Bonjour Madame N'Guessan,\n\nNous espérons que vous allez bien. Nous constatons que le loyer du logement B03 d'un montant de 420 000 FCFA n'a pas encore été réglé. Le retard est actuellement de 30 jours.\n\nNous comprenons que des difficultés peuvent survenir et restons à votre disposition pour trouver une solution adaptée à votre situation.\n\nNous vous remercions de bien vouloir régulariser votre situation dans les meilleurs délais.\n\nCordialement,\nGestion Locat"
}
```

**Validation :** Vérification de la présence du message

**Fallback :** MockAI génère un message basé sur un template avec les données du reminder

**Limites :**
- Pas d'envoi réel SMS/WhatsApp/Email dans le prototype
- Le message est seulement généré et marqué comme "envoyé" dans localStorage
- Le gestionnaire doit copier-coller le message manuellement pour l'envoi réel

---

## 12. Transparence sur l'IA et les outils

### IA utilisée dans le produit

#### Modèle NVIDIA (production)

**Configuration :**
- **Provider :** NVIDIA AI API
- **Endpoint :** Configuré dans `lib/ai/nvidia-provider.ts`
- **Variables d'environnement :**
  - `NVIDIA_API_KEY` : Clé API serveur (jamais exposée au client)
  - `NVIDIA_MODEL` : Identifiant du modèle à utiliser

**Prompts utilisés :**

**Vision AI :**
```typescript
const prompt = `Analyse ces photos d'un logement immobilier en Côte d'Ivoire.

Photos à analyser:
${images.slice(0,3).join('\n')}

Identifie et retourne au format JSON:
- detectedSpaces: liste des espaces visibles (salon, cuisine, chambre, etc.)
- visibleFeatures: liste des caractéristiques observables (état, équipements, finitions)
- uncertainElements: liste des éléments difficiles à déterminer avec certitude

Reste factuel et base-toi uniquement sur ce qui est visible dans les photos.`
```

**Listing AI :**
```typescript
const prompt = `Génère une annonce immobilière professionnelle pour ce logement en Côte d'Ivoire.

Informations métier:
- Type: ${property.type}
- Surface: ${property.surface} m²
- Loyer: ${property.rent} FCFA/mois
- Localisation: ${property.structure.commune}, ${property.structure.nom}
- Meublé: ${property.meuble ? 'Oui' : 'Non'}

Observations visuelles:
${JSON.stringify(analysis, null, 2)}

Retourne au format JSON:
- title: titre attractif (max 100 caractères)
- description: texte complet (200-400 mots)
- highlights: 3-5 points forts
- warnings: avertissements si incertitudes

NE MODIFIE JAMAIS les informations métier (loyer, surface, localisation).`
```

**Reminder AI :**
```typescript
const prompt = `Rédige un message de relance professionnel pour un loyer en retard en Côte d'Ivoire.

Contexte:
- Locataire: ${tenant}
- Logement: ${property}
- Loyer: ${rent} FCFA
- Retard: ${lateDays} jours
- Ton demandé: ${tone}

Le message doit:
- Être courtois et professionnel
- Mentionner les informations de contexte
- Proposer le dialogue si nécessaire
- Inviter à régulariser la situation

Retourne uniquement le texte du message.`
```

**Fallback MockAI :**

Lorsque `NVIDIA_API_KEY` n'est pas défini, le prototype utilise automatiquement `MockAIProvider` :
- Simule un délai de traitement (500-1500ms)
- Retourne des réponses cohérentes avec les données d'entrée
- Permet de tester le workflow complet sans clé API
- Utilisé pour les démonstrations hors ligne

**Données utilisées :**
- Photos : URLs publiques uniquement (pas de données sensibles)
- Informations métier : type, surface, loyer, localisation (données non personnelles)
- Reminders : noms fictifs, montants synthétiques

---

### IA utilisée pendant le développement

Nous tenons à être transparents sur les outils utilisés pour construire ce projet :

#### Outils d'assistance au développement

**v0 by Vercel :**
- Utilisé pour prototyper rapidement l'interface utilisateur
- Génération de composants React de base
- Propositions de structure CSS

**GitHub Copilot / Assistants de code :**
- Autocomplétion de code TypeScript
- Suggestions de fonctions utilitaires
- Aide à la documentation

**Kiro AI :**
- Architecture du projet
- Refactoring et optimisations
- Corrections de bugs
- Documentation technique
- Harmonisation des données

**ChatGPT / Claude :**
- Aide à la rédaction de prompts pour l'IA NVIDIA
- Brainstorming sur l'architecture
- Révision de la documentation

#### Processus de validation

**Tout le code généré par IA a été :**
- ✅ Vérifié manuellement par l'équipe
- ✅ Adapté au contexte du projet Locat
- ✅ Testé en conditions réelles
- ✅ Validé par compilation TypeScript
- ✅ Déployé et testé en production

**Aucun code n'a été utilisé tel quel sans révision humaine.**

---

## 13. Données

### Transparence sur les données du prototype

#### Données métier synthétiques

**Toutes les données métier du prototype sont fictives :**

**Logements (6 au total) :**
```typescript
// Exemples de logements seed
{ id: 'a02', numero: 'A02', type: 'studio', surface: 35, rent: 200000, status: 'libre', ... }
{ id: 'a01', numero: 'A01', type: '2_pieces', surface: 55, rent: 250000, status: 'occupe', ... }
{ id: 'b01', numero: 'B01', type: '3_pieces', surface: 75, rent: 350000, status: 'libre', ... }
```

**Reminders (6 au total) :**
```typescript
// Exemples de reminders
{ id: 'r1', tenant: 'Jean Kouassi', property: 'A01', rent: 180000, lateDays: 0, status: 'à_jour' }
{ id: 'r2', tenant: 'Marie N\'Guessan', property: 'B03', rent: 420000, lateDays: 30, status: 'retard' }
```

**Aucune donnée réelle de locataire n'est utilisée dans le prototype.**

#### Photos de démonstration

**Les photos proviennent de :**
- **Unsplash :** URLs publiques d'images de démonstration
- Exemples : `https://images.unsplash.com/photo-...`
- Aucune photo personnelle ou privée

**Photos sélectionnables :**
```typescript
const DEMO_PHOTOS = [
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
  'https://images.unsplash.com/photo-1502672260066-6bc357c4ee12?w=800',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
]
```

#### Stockage navigateur (localStorage)

**Le prototype utilise localStorage uniquement pour la démonstration :**

**Clés utilisées :**
- `locat-properties-v1` : Nouveaux logements créés
- `locat-listings-v1` : Annonces publiées
- `locat-sent-reminders` : Relances envoyées
- `locat-contact-requests` : Demandes de contact

**Limites :**
- Les données sont stockées localement sur l'appareil de l'utilisateur
- Pas de synchronisation entre appareils
- Effacement si le cache du navigateur est vidé
- Aucune base de données backend

#### Données sensibles

**Le prototype ne collecte ni ne stocke aucune donnée sensible :**
- ❌ Pas de mots de passe
- ❌ Pas de numéros de téléphone réels
- ❌ Pas d'informations bancaires
- ❌ Pas de documents d'identité
- ❌ Pas de données de paiement

**Les demandes de contact stockent uniquement :**
- Nom (fictif pour la démo)
- Téléphone (fictif pour la démo)
- Message (contenu de démonstration)

**Ces données restent dans le navigateur et ne sont jamais envoyées à un serveur.**

---

## 14. Tests et fiabilité

### Tests manuels effectués

| Test                        | Entrée                              | Résultat observé                                      | Preuve        |
| --------------------------- | ----------------------------------- | ----------------------------------------------------- | ------------- |
| **Création logement**       | C12 + 35m² + 200k + Cocody + 2 photos | Logement créé et visible dans /logements             | ✅ Vidéo démo |
| **Persistance après refresh**| Refresh page logements             | C12 toujours présent dans la liste                   | ✅ Test local |
| **Sélection photos**        | 2 photos sélectionnées              | Photos affichées dans la galerie du logement         | ✅ Vidéo démo |
| **Vision AI (A02)**         | 3 photos logement A02               | Observations structurées retournées                  | ✅ Vidéo démo |
| **Listing AI (A02)**        | A02 + observations Vision           | Annonce générée avec titre, description, highlights  | ✅ Vidéo démo |
| **Caractéristiques dynamiques** | A02 (studio 35m² 200k)          | Affiche "Studio · 35 m² · 200 000 FCFA / mois"      | ✅ Vidéo démo |
| **Publication annonce**     | Annonce A02 validée                 | Visible dans `/annonces`                             | ✅ Vidéo démo |
| **Contact gestionnaire**    | Nom + Téléphone + Message           | Modal affiche confirmation, stockage localStorage    | ✅ Test local |
| **Reminder AI**             | Marie N'Guessan + 30 jours          | Relance générée avec contexte correct                | ✅ Vidéo démo |
| **Ton relance**             | Changement respectueux → ferme      | Message adapté au ton sélectionné                    | ✅ Test local |
| **Validation relance**      | Clic "Valider l'envoi"              | Badge "Relance envoyée" affiché                      | ✅ Vidéo démo |
| **Compteurs loyers**        | Dashboard + page Loyers             | "1 loyer en retard" affiché (cohérent avec données) | ✅ Vidéo démo |

### Cas limite testé

**Test : Logement sans photos**
- **Entrée :** Création d'un logement sans sélectionner de photos
- **Résultat :** Le système utilise automatiquement 2 photos par défaut
- **Comportement attendu :** ✅ Confirmé

**Test : Analyse avec 1 seule photo**
- **Entrée :** Logement avec 1 photo seulement
- **Résultat :** Vision AI analyse 1 photo, compteur affiche "1 photo analysée"
- **Comportement attendu :** ✅ Confirmé

### Limitation connue testée

**Test : Logement créé visible par l'IA**
- **Problème initial :** API routes cherchaient dans localStorage côté serveur (impossible)
- **Solution appliquée :** Client envoie le property complet dans le body de la requête
- **Test :** Logement C12 créé → Analyse Vision → Génération Listing
- **Résultat :** ✅ Fonctionne correctement

### Fallback testé

**Test : MockAI sans clé NVIDIA**
- **Configuration :** Pas de `NVIDIA_API_KEY` définie
- **Résultat :** MockAIProvider utilisé automatiquement
- **Observations :**
  - Délai simulé (500-1500ms)
  - Réponses cohérentes avec les données d'entrée
  - Workflow complet fonctionnel
- **Comportement attendu :** ✅ Confirmé

### Build production

**Test de compilation :**
```bash
npm run build
```

**Résultats :**
- ✅ Compilation TypeScript réussie
- ✅ Génération des pages statiques (10/10)
- ✅ Pas d'erreur de parsing
- ✅ Build Vercel `success`

### Limitations non testées

**Non testé dans le prototype :**
- ❌ Charge simultanée (plusieurs utilisateurs)
- ❌ Performance avec 100+ logements
- ❌ Compatibilité multi-navigateurs exhaustive
- ❌ Tests unitaires automatisés
- ❌ Tests d'intégration API
- ❌ Envoi réel SMS/WhatsApp
- ❌ Paiement Mobile Money

**Ces fonctionnalités nécessitent une infrastructure backend complète (Supabase) prévue pour la V2.**

---

## 15. Limitations connues

### Infrastructure

❌ **Pas de base de données dans le prototype**
- Toutes les données sont stockées dans localStorage (navigateur)
- Pas de synchronisation entre appareils
- Pas de gestion multi-utilisateur

❌ **Persistance limitée au navigateur**
- Les données sont effacées si le cache est vidé
- Pas de sauvegarde automatique
- Pas de restauration possible

❌ **Prototype mono-utilisateur**
- Pas d'authentification
- Pas de gestion des permissions
- Pas de séparation des données entre utilisateurs

### Fonctionnalités

❌ **Photos de démonstration uniquement**
- Pas de vrai upload de fichiers
- Pas de stockage d'images sur serveur
- Sélection limitée à 4 photos prédéfinies

❌ **Pas d'envoi réel SMS / WhatsApp**
- Les relances sont seulement générées
- Marquage "envoyé" dans localStorage
- Le gestionnaire doit copier-coller manuellement

❌ **Pas de paiement Mobile Money**
- Pas d'intégration API de paiement
- Pas de suivi des transactions réelles
- Montants mockés pour la démonstration

### IA et provider

❌ **Fallback MockAI par défaut**
- Sans `NVIDIA_API_KEY`, le mock est utilisé
- Réponses simulées (mais cohérentes)
- Pas de vraie analyse d'images

❌ **Dépendance à NVIDIA**
- Si l'API NVIDIA est indisponible, retour au mock
- Pas de retry automatique en cas d'erreur
- Limite de débit non gérée

❌ **Limite de 3 photos par analyse**
- Contrainte du prototype
- Les photos supplémentaires sont ignorées
- Pas de traitement par lots

### Sécurité

❌ **Pas d'authentification**
- Tout le monde peut accéder au dashboard
- Pas de protection des données
- Pas de gestion des sessions

❌ **Secrets en environnement serveur uniquement**
- `NVIDIA_API_KEY` côté serveur seulement
- Mais pas de validation d'origine des requêtes
- Vulnérable aux abus potentiels

❌ **Validation limitée**
- Validation basique des entrées
- Pas de protection contre les injections
- Pas de rate limiting

### Interface

❌ **Pas de mode responsive complet**
- Design optimisé pour desktop principalement
- Certaines vues peuvent être difficiles sur mobile
- Pas de test exhaustif sur tablettes

❌ **Pas de gestion des erreurs réseau**
- Retry manuel en cas d'échec
- Pas de message d'erreur détaillé
- Pas de mode hors ligne

---

## 16. IA responsable et supervision humaine

### Principes appliqués

#### 🎯 Données synthétiques

**Tous les tests et démonstrations utilisent des données fictives :**
- Noms de locataires : inventés
- Montants de loyers : réalistes mais fictifs
- Photos : banque d'images publiques (Unsplash)
- Aucune donnée personnelle réelle

#### 🔒 Séparation données métier / observations IA

**Les informations critiques ne sont JAMAIS modifiées par l'IA :**

**Données métier (source de vérité) :**
- Surface du logement
- Montant du loyer
- Type de logement
- Localisation
- Statut (libre/occupé)

**Observations IA (propositions) :**
- Description textuelle
- Points forts suggérés
- Éléments visuels détectés

**L'IA ne peut que reformuler et enrichir, jamais modifier les faits métier.**

#### ❌ Pas d'invention d'informations critiques

**L'IA ne peut PAS :**
- Modifier le montant du loyer
- Changer la surface du logement
- Inventer des équipements non visibles
- Promettre des services inexistants
- Modifier les conditions de location

**L'IA PEUT :**
- Décrire ce qui est visible dans les photos
- Reformuler la description existante
- Suggérer des points forts basés sur les observations
- Adapter le ton du message

#### ⚠️ Traitement des incertitudes

**L'IA signale explicitement ses incertitudes :**

**Exemple dans Vision AI :**
```json
{
  "uncertainElements": [
    "État exact des murs difficile à déterminer sur les photos"
  ]
}
```

**Affichage dans l'interface :**
```text
⚠️ État des murs non déterminé avec certitude.
```

**Le gestionnaire est informé des limites de l'analyse et peut vérifier manuellement.**

#### ✅ Validation humaine avant publication

**Workflow annonce :**
1. IA génère une proposition d'annonce
2. **Le gestionnaire révise le contenu**
3. **Le gestionnaire peut modifier le titre et la description**
4. **Le gestionnaire clique "Publier maintenant"**
5. Seulement après validation, l'annonce devient publique

**Aucune publication automatique.**

#### ✅ Validation humaine avant envoi relance

**Workflow relance :**
1. IA génère un message de relance
2. **Le gestionnaire lit le message complet**
3. **Le gestionnaire peut modifier le message**
4. **Le gestionnaire peut régénérer avec un autre ton**
5. **Le gestionnaire clique "Valider l'envoi"**
6. Seulement après validation, la relance est marquée comme envoyée

**Aucun envoi automatique.**

#### 🔐 Conservation des secrets côté serveur

**Clés API et secrets :**
- `NVIDIA_API_KEY` définie uniquement en variable serveur
- Jamais exposée au navigateur
- Jamais dans le code client
- Jamais dans les commits Git

**Variables d'environnement :**
```bash
# .env.local (serveur uniquement, jamais commité)
NVIDIA_API_KEY=your_key_here
NVIDIA_MODEL=your_model_id
```

**Jamais de `NEXT_PUBLIC_` pour les secrets.**

#### 🚫 Pas de données personnelles réelles

**Le prototype ne collecte pas de données personnelles :**
- Pas d'inscription utilisateur
- Pas de stockage de mots de passe
- Pas de numéros de téléphone réels
- Pas d'adresses email réelles
- Pas de documents d'identité

**Les demandes de contact sont stockées localement (localStorage) et ne sont jamais envoyées à un serveur.**

### Engagement pour la V2

**Dans la version production avec Supabase :**
- ✅ Authentification sécurisée
- ✅ Chiffrement des données sensibles
- ✅ Row-Level Security (RLS) sur PostgreSQL
- ✅ Logs d'audit des modifications IA
- ✅ Consentement explicite pour l'utilisation de l'IA
- ✅ Droit à la révision humaine systématique

---

## 17. Sécurité

### Mesures de sécurité actuelles

#### 🔐 Secrets côté serveur

**Toutes les clés API sont stockées côté serveur :**
```typescript
// ✅ BON : Variable serveur (accessible uniquement backend)
const apiKey = process.env.NVIDIA_API_KEY

// ❌ MAUVAIS : Jamais utilisé
const apiKey = process.env.NEXT_PUBLIC_NVIDIA_API_KEY
```

**Configuration Vercel :**
- Variables d'environnement définies dans le dashboard Vercel
- Jamais exposées au client
- Jamais dans le code source

#### ✅ Validation des entrées

**Toutes les routes API valident les entrées :**

```typescript
// Validation propertyId
if (!body || typeof body.propertyId !== 'string' || body.propertyId.length > 80) {
  return invalidInput('Identifiant de logement invalide.')
}

// Validation photos
if (!body.property || !Array.isArray(body.property.photos)) {
  return invalidInput('Données du logement manquantes.')
}

// Validation analysis
try {
  analysis = validatePropertyAnalysis(body.analysis)
} catch {
  return invalidInput('Les observations visuelles sont invalides.')
}
```

**Schémas Zod :**
```typescript
export const PropertyAnalysisSchema = z.object({
  detectedSpaces: z.array(z.string()),
  visibleFeatures: z.array(z.string()),
  uncertainElements: z.array(z.string())
})
```

#### 🚨 Réponses d'erreur publiques

**Les erreurs exposées au client sont génériques :**

```typescript
// ✅ Erreur publique (pas de détails sensibles)
return publicAIError(error, 'Locat AI n\'a pas pu terminer l\'analyse pour le moment. Réessayez.')

// ❌ Erreur interne (loggée serveur uniquement)
console.error('[Locat AI] Unexpected analysis failure', error.stack)
```

**Pas de fuite d'informations sensibles dans les messages d'erreur.**

#### 🛡️ Filtrage des URLs photos

**Seules les URLs HTTP/HTTPS sont acceptées :**
```typescript
const images = body.property.photos
  .filter((photo: unknown) => typeof photo === 'string' && /^https?:\/\//i.test(photo))
  .slice(0, 3)

if (images.length === 0) {
  return invalidInput('Aucune photo exploitable pour ce logement.')
}
```

**Pas de support pour les Data URLs (évite les payloads trop lourds).**

### Limites de sécurité du prototype

#### ❌ Pas d'authentification

**Conséquences :**
- Tout le monde peut accéder au dashboard
- Pas de séparation des données entre utilisateurs
- Pas de gestion des permissions
- Vulnérable aux abus

**Solution V2 :** Supabase Auth + Row-Level Security

#### ❌ Pas de rate limiting

**Conséquences :**
- Un utilisateur peut faire des milliers de requêtes API
- Potentiel abus des ressources NVIDIA
- Coûts incontrôlés

**Solution V2 :** Middleware rate limiting + quotas utilisateur

#### ❌ Pas de validation CORS stricte

**Conséquences :**
- Les routes API sont accessibles depuis n'importe quel domaine
- Risque d'utilisation abusive depuis d'autres sites

**Solution V2 :** Configuration CORS stricte avec whitelist de domaines

#### ❌ localStorage accessible par JavaScript

**Conséquences :**
- Vulnérable aux attaques XSS
- Pas de chiffrement des données
- Lisible par n'importe quel script

**Solution V2 :** Stockage backend avec chiffrement + HttpOnly cookies

### Ce qui sera ajouté en production

#### 🔒 Authentification complète

**Supabase Auth :**
- Email + mot de passe
- OAuth (Google, Facebook)
- Vérification email
- Reset mot de passe sécurisé

#### 🛡️ Autorisation et permissions

**Row-Level Security (RLS) :**
```sql
-- Exemple de politique Supabase
CREATE POLICY "Users can only see their own properties"
ON properties FOR SELECT
USING (auth.uid() = user_id);
```

#### 🔐 Chiffrement des données

**Données sensibles chiffrées :**
- Numéros de téléphone
- Adresses email
- Documents contractuels
- Informations bancaires (si Mobile Money intégré)

#### 🚨 Monitoring et alertes

**Supabase Dashboard :**
- Logs d'accès API
- Détection d'anomalies
- Alertes en cas d'abus
- Métriques de performance

#### 🔥 Rate limiting

**Middleware personnalisé :**
```typescript
// Exemple de rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // max 100 requêtes par fenêtre
})
```

#### 🔍 Audit trail

**Logs des modifications IA :**
- Qui a demandé une analyse ?
- Quand ?
- Quel logement ?
- Résultat accepté ou modifié ?

---

## 18. Installation

### Prérequis

- **Node.js** 18+ (compatible Next.js 16)
- **pnpm** 12.3.4+ (recommandé) ou npm/yarn
- **Git**

### Installation locale

```bash
# Cloner le dépôt
git clone https://github.com/BenSek225/Locat-ai_Hackaton.git
cd Locat-ai_Hackaton/locat-ai-app

# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev
```

**L'application sera accessible sur : `http://localhost:3000`**

### Variables d'environnement

Créer un fichier `.env.local` à la racine du projet :

```bash
# .env.local (JAMAIS commiter ce fichier !)

# Clé API NVIDIA (optionnelle, MockAI par défaut)
NVIDIA_API_KEY=votre_cle_api_nvidia

# Modèle NVIDIA (optionnel)
NVIDIA_MODEL=votre_model_id
```

#### Configuration NVIDIA (optionnelle)

**Si vous souhaitez activer le vrai provider NVIDIA :**

1. Obtenir une clé API NVIDIA :
   - Créer un compte sur [NVIDIA NGC](https://catalog.ngc.nvidia.com/)
   - Générer une API key
   - Copier la clé

2. Définir les variables :
   ```bash
   NVIDIA_API_KEY=nvapi-xxx...
   NVIDIA_MODEL=meta/llama-3.1-70b-instruct
   ```

3. Redémarrer le serveur :
   ```bash
   pnpm dev
   ```

**Si ces variables ne sont pas définies, le prototype utilisera automatiquement MockAI (fallback).**

### URLs de développement

- **Dashboard :** `http://localhost:3000/`
- **Logements :** `http://localhost:3000/logements`
- **Loyers :** `http://localhost:3000/loyers`
- **Annonces :** `http://localhost:3000/annonces`
- **API Vision :** `http://localhost:3000/api/ai/property-analysis`
- **API Listing :** `http://localhost:3000/api/ai/property-listing`
- **API Reminder :** `http://localhost:3000/api/ai/rent-reminder`

### URL de production

**Demo live déployée sur Vercel :**

🌐 **https://locat-ai-hackaton.vercel.app**

---

## 19. Déploiement

### Plateforme : Vercel

Le prototype est déployé automatiquement sur **Vercel** à chaque push sur la branche `main`.

**Commit de référence actuel :**
```bash
Commit: c319f8c
Branch: main
Status: ✅ success
Build: Passed
```

### Configuration Vercel

#### Variables d'environnement (Vercel Dashboard)

**Production :**
```
NVIDIA_API_KEY = nvapi-xxx... (secret)
NVIDIA_MODEL = meta/llama-3.1-70b-instruct
```

**Important :**
- ❌ Ne jamais préfixer avec `NEXT_PUBLIC_`
- ✅ Marquer comme "Secret" dans Vercel
- ✅ Variables disponibles uniquement côté serveur

#### Build Settings

```bash
Framework Preset: Next.js
Build Command: pnpm build
Output Directory: .next
Install Command: pnpm install
```

#### Domaine

**URL de production :**
- `https://locat-ai-hackaton.vercel.app`

**Branche :**
- `main` (branche de production)

### Workflow de déploiement

```text
1. Développement local
   ↓
2. Commit + Push sur GitHub
   ↓
3. Vercel détecte le push sur main
   ↓
4. Build automatique (npm run build)
   ↓
5. Tests de compilation TypeScript
   ↓
6. Génération des pages statiques
   ↓
7. Déploiement en production
   ↓
8. URL de production mise à jour
```

**Durée moyenne : 2-3 minutes**

### Vérification du déploiement

**Après chaque déploiement, vérifier :**

✅ Build Vercel `success`
✅ Pas d'erreurs TypeScript
✅ Pages accessibles (/, /logements, /loyers, /annonces)
✅ API routes fonctionnelles
✅ MockAI ou NVIDIA selon la configuration

**Commandes de vérification locale :**
```bash
# Build local
pnpm build

# Vérification TypeScript
pnpm exec tsc --noEmit
```

### Logs et monitoring

**Vercel Dashboard :**
- 📊 Analytics : Nombre de visites, pages vues
- 🐛 Logs : Erreurs serveur, logs API
- ⚡ Performance : Web Vitals, temps de chargement
- 🔍 Deployment : Historique des déploiements

**Accès :** https://vercel.com/dashboard

---

### Note importante

> **La version déployée correspond au prototype utilisé pour la démonstration du hackathon.**
>
> Ce prototype est volontairement simplifié et ne contient pas toutes les fonctionnalités de la vision globale de Locat. Pour découvrir le projet complet, consultez [Locat Mobile](https://github.com/BenSek225/Locat-Mobile).

---

## 20. Structure du projet

```text
locat-ai-app/
│
├── app/                              # Next.js App Router
│   ├── api/                          # API Routes (server-side)
│   │   └── ai/
│   │       ├── property-analysis/    # Vision AI endpoint
│   │       │   └── route.ts
│   │       ├── property-listing/     # Listing AI endpoint
│   │       │   └── route.ts
│   │       └── rent-reminder/        # Reminder AI endpoint
│   │           └── route.ts
│   │
│   ├── annonces/                     # Pages annonces publiques
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── logements/                    # Pages logements
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── page.tsx                      # Composants principaux
│   ├── globals.css                   # Styles CSS personnalisés
│   ├── layout.tsx                    # Layout global
│   ├── error.tsx                     # Page d'erreur
│   └── not-found.tsx                 # Page 404
│
├── lib/                              # Logique métier
│   ├── ai/                           # Couche IA
│   │   ├── provider.ts               # Sélection du provider
│   │   ├── nvidia-provider.ts        # Intégration NVIDIA
│   │   ├── mock-provider.ts          # Fallback mock
│   │   ├── schemas.ts                # Validation Zod
│   │   └── http.ts                   # Helpers HTTP
│   │
│   ├── mock-data.ts                  # Données seed (6 logements, 6 reminders)
│   ├── property-storage.ts           # Storage logements (localStorage)
│   ├── listing-storage.ts            # Storage annonces (localStorage)
│   └── utils.ts                      # Utilitaires généraux
│
├── components/                       # Composants réutilisables
│   └── ui/
│       └── button.tsx
│
├── public/                           # Assets statiques
│   ├── icon.svg
│   ├── placeholder.jpg
│   └── ...
│
├── .env.example                      # Template variables d'environnement
├── .env.local                        # Variables locales (non commité)
├── package.json                      # Dépendances npm
├── pnpm-lock.yaml                    # Lock file pnpm
├── tsconfig.json                     # Configuration TypeScript
├── next.config.mjs                   # Configuration Next.js
├── tailwind.config.ts                # Configuration Tailwind
├── postcss.config.mjs                # Configuration PostCSS
└── README.md                         # Documentation (ce fichier)
```

### Fichiers clés

#### `/app/page.tsx`
Contient tous les composants principaux :
- `Dashboard` : Vue d'ensemble
- `Logements` : Liste + création logements
- `PropertyDetail` : Détail + workflow IA
- `Loyers` : Suivi paiements + Reminder AI
- `Annonces` : Vitrine publique
- `PublicDetail` : Détail annonce publique

#### `/lib/ai/provider.ts`
Sélection automatique du provider IA :
```typescript
export function getAIProvider(): AIProvider {
  if (process.env.NVIDIA_API_KEY && process.env.NVIDIA_MODEL) {
    return new NVIDIAProvider()
  }
  return new MockAIProvider()
}
```

#### `/lib/property-storage.ts`
Gestion des logements avec merge seed + localStorage :
```typescript
export function getProperties(): Property[]
export function getProperty(id: string): Property | undefined
export function addProperty(input: NewProperty): Property
export function updateProperty(id: string, updates: Partial<Property>): Property | undefined
export function deleteProperty(id: string): void
```

#### `/lib/mock-data.ts`
Données seed pour la démo :
- 6 logements (A01, A02, B01, B03, H02, H05)
- 6 reminders (r1-r6)
- Analyses IA prédéfinies

---

## 21. Roadmap

### ✅ Prototype hackathon (état actuel)

**Ce qui existe maintenant :**

- ✅ Dashboard gestionnaire avec statistiques
- ✅ Portefeuille de logements (liste, filtres, recherche)
- ✅ Création de logements avec sélection de photos
- ✅ Vision AI : analyse des photos
- ✅ Listing AI : génération d'annonces
- ✅ Publication d'annonces sur vitrine publique
- ✅ Reminder AI : relances de loyers
- ✅ Validation humaine avant publication/envoi
- ✅ Persistance localStorage
- ✅ Provider NVIDIA + fallback MockAI
- ✅ Déploiement Vercel
- ✅ Build production fonctionnel

### 🚀 V2 Locat (évolution vers le produit complet)

**Infrastructure :**
- 🔄 Migration Supabase (PostgreSQL + Auth + Storage)
- 🔄 Authentification sécurisée (email, OAuth)
- 🔄 Row-Level Security (RLS) pour isolation des données
- 🔄 API REST + webhooks
- 🔄 Synchronisation web ↔ mobile

**Gestion complète :**
- 📱 Application mobile (React Native + Expo)
- 👥 Gestion des locataires (contrats, documents)
- 💰 Paiements Mobile Money (Orange Money, MTN, Moov)
- 📄 Génération automatique de quittances (PDF)
- 📊 Rapports et statistiques avancées
- 🔔 Notifications push (mobile + web)
- 📅 Calendrier des échéances

**IA avancée :**
- 🤖 Assistant gestionnaire conversationnel
- 📸 Upload réel de photos (Supabase Storage)
- 🔍 Recherche sémantique dans les annonces
- 📈 Prédiction des impayés
- 💬 Génération automatique de contrats
- 🌐 Traduction multilingue des annonces

**Communication :**
- 📧 Envoi réel d'emails
- 💬 Intégration WhatsApp Business API
- 📱 Envoi SMS automatisés
- 📞 Historique des communications

**Sécurité :**
- 🔐 Chiffrement des données sensibles
- 🛡️ Rate limiting et protection DDoS
- 🔍 Audit trail complet
- 🚨 Alertes de sécurité

**Multi-utilisateur :**
- 👥 Gestion d'équipes (gestionnaires, assistants)
- 🏢 Multi-structures (agences immobilières)
- 🔑 Permissions granulaires
- 📊 Tableaux de bord personnalisés

### 🌟 Vision long terme

**Marketplace :**
- 🏠 Plateforme de mise en relation gestionnaires ↔ locataires
- ⭐ Système d'évaluation et avis
- 🔎 Recherche avancée de logements
- 📍 Carte interactive des annonces

**Services additionnels :**
- 🔧 Maintenance et dépannage
- 🧹 Services de nettoyage
- 🏗️ Travaux et rénovations
- 🔑 Conciergerie

**Analytics :**
- 📊 Analyse prédictive du marché
- 💹 Recommandations de prix optimaux
- 🎯 Ciblage publicitaire intelligent

---

## 22. Relation avec Locat Mobile

### Comprendre la distinction

**Locat Mobile** est le **produit principal** — un projet plus large de gestion locative pensé pour centraliser toutes les opérations immobilières des gestionnaires et locataires en Côte d'Ivoire.

**Locat AI Hackathon** est un **prototype web expérimental** construit spécifiquement pour le hackathon GOMYCODE × NVIDIA, qui isole deux workflows où l'IA apporte immédiatement de la valeur.

### Architecture globale du projet Locat

```text
Locat (Vision globale)
│
├── Locat Mobile (Produit principal)
│   ├── App gestionnaire (React Native)
│   ├── App locataire (React Native)
│   ├── Backend Supabase
│   │   ├── PostgreSQL (données)
│   │   ├── Auth (authentification)
│   │   ├── Storage (fichiers)
│   │   └── Realtime (notifications)
│   └── Fonctionnalités complètes
│       ├── Structures et logements
│       ├── Locataires et contrats
│       ├── Paiements et quittances
│       ├── Rappels et notifications
│       ├── Rapports et statistiques
│       └── Mobile Money
│
└── Locat AI Hackathon (Prototype web expérimental)
    ├── Next.js + React (web uniquement)
    ├── localStorage (prototype, pas de DB)
    ├── NVIDIA AI + fallback mock
    └── Focus sur 2 workflows IA :
        ├── Vision AI → Listing AI (annonces)
        └── Reminder AI (relances)
```

### Pourquoi deux dépôts ?

**Locat Mobile est le projet de fond :**
- Développement commencé avant le hackathon
- Architecture complète (mobile + backend)
- Vision long terme (produit commercial)

**Locat AI Hackathon est une expérimentation ciblée :**
- Créé spécifiquement pour le hackathon
- Prototype web rapide (3-4 jours de dev)
- Démonstration des capacités IA sur un périmètre réduit

### Complémentarité

**Le prototype hackathon sert de :**
- 🧪 **Laboratoire** pour tester l'intégration IA
- 📊 **Proof of concept** pour les workflows IA
- 🎯 **Validation** de l'approche "IA propose, humain valide"
- 🚀 **Accélérateur** pour le développement IA dans le produit mobile

**Le produit mobile reste le cœur du projet :**
- 📱 Expérience utilisateur complète
- 🔐 Infrastructure sécurisée (Supabase)
- 💳 Intégrations paiements réelles
- 🌍 Déploiement en production

### Évolution prévue

**Phase 1** (actuelle) : Prototype hackathon démontre la faisabilité
**Phase 2** (2-3 mois) : Intégration des workflows IA dans Locat Mobile
**Phase 3** (6 mois) : Déploiement version beta avec IA
**Phase 4** (1 an) : Marketplace Locat avec IA intégrée

---

### Liens importants

📱 **Locat Mobile (produit principal) :**  
[https://github.com/BenSek225/Locat-Mobile](https://github.com/BenSek225/Locat-Mobile)

🌐 **Locat AI Hackathon (prototype web) :**  
[https://github.com/BenSek225/Locat-ai_Hackaton](https://github.com/BenSek225/Locat-ai_Hackaton)

🚀 **Demo live :**  
[https://locat-ai-hackaton.vercel.app](https://locat-ai-hackaton.vercel.app)

---

## 23. Équipe

### Nom de l'équipe
**Locat Team**

### Responsable
**Bienvenu SEKONGO**
- GitHub : [@BenSek225](https://github.com/BenSek225)
- Email : [bienvenu.sekongo@example.com](mailto:bienvenu.sekongo@example.com)
- Rôle : Lead Developer & Product Owner

### Membres
- **Bienvenu SEKONGO** — Full Stack Developer (Next.js, React Native, TypeScript)

### Pays
🇨🇮 **Côte d'Ivoire**

### Participation
**ONLINE** — Hackathon 100% en ligne

---

## 24. Hackathon

### Événement
**GOMYCODE × NVIDIA — Come Build with AI 2026**

### Dates
- **Début :** 20 septembre 2026
- **Fin :** 27 septembre 2026 (16h30 GMT)
- **Durée :** 7 jours

### Catégorie
**AI Innovation Track**

### Thème
Développer une solution innovante utilisant l'IA pour résoudre un problème concret.

### Choix de Locat AI
Nous avons choisi de démontrer comment l'IA peut transformer des tâches répétitives de gestion locative en workflows assistés, tout en gardant le contrôle humain sur les décisions importantes.

### Objectifs atteints
✅ Prototype web fonctionnel  
✅ Intégration NVIDIA AI (+ fallback mock)  
✅ Démonstration de 2 workflows IA concrets  
✅ Validation humaine avant publication/envoi  
✅ Déploiement production sur Vercel  
✅ Documentation complète  
✅ Code source open source  

### Liens officiels
- 🏆 **Hackathon :** [GOMYCODE × NVIDIA](https://www.gomycode.com/hackathon)
- 🔗 **GitHub :** [Locat AI Hackathon](https://github.com/BenSek225/Locat-ai_Hackaton)
- 🌐 **Demo :** [https://locat-ai-hackaton.vercel.app](https://locat-ai-hackaton.vercel.app)

---

## 25. Licence

**MIT License**

Copyright (c) 2026 Locat Team - Bienvenu SEKONGO

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## Note finale

> Locat AI explore une idée simple : **utiliser l'IA pour transformer les tâches répétitives de gestion locative en actions plus rapides, tout en gardant les données métier et la décision finale entre les mains du gestionnaire**.
>
> Ce prototype démontre qu'il est possible d'intégrer l'IA de manière responsable dans des workflows métier concrets, en privilégiant la supervision humaine et la transparence.
>
> **Le voyage ne fait que commencer.** 🚀

---

## Remerciements

Merci à **GOMYCODE** et **NVIDIA** pour l'organisation de ce hackathon et la mise à disposition des ressources IA.

Merci aux utilisateurs qui testeront ce prototype et partageront leurs retours pour améliorer Locat.

---

**Fait avec ❤️ en Côte d'Ivoire 🇨🇮**

**© 2026 Locat Team**
