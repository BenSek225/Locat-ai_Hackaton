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

### Frontend
- **Next.js 16.3** — Framework React avec App Router
- **TypeScript 5.7** — Typage statique
- **Tailwind CSS 4.3** — Design system moderne
- **Lucide React** — Icônes
- **shadcn/ui** — Composants UI

### AI & Backend
- **NVIDIA AI** — Vision et génération de texte
- **Mock AI Provider** — Fallback pour la démo sans API key
- **Next.js API Routes** — Backend serverless

### Déploiement
- **Vercel** — Hébergement et CI/CD
- **GitHub** — Version control

---

## 🏗️ Architecture

```
locat-ai-app/
├── app/                      # App Router (Next.js 16)
│   ├── page.tsx             # Dashboard principal
│   ├── logements/           # Gestion des logements
│   ├── loyers/              # Gestion des loyers
│   └── annonces/            # Vitrine publique
├── lib/
│   ├── ai-provider.ts       # Interface IA (NVIDIA + Mock)
│   ├── mock-data.ts         # Données de démo cohérentes
│   └── utils.ts             # Utilitaires
├── components/
│   └── ui/                  # Composants réutilisables
└── public/                  # Assets statiques
```

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

### Scénario 1 : Générer une annonce avec l'IA
1. **Dashboard** → Voir "1 logement libre sans annonce"
2. **Cliquer** sur "Analyser le logement"
3. **Logement A02** → Cliquer "Analyser avec Locat AI"
4. **Vision AI** analyse les 3 photos (simulation 2-3 secondes)
5. **Résultats** : 4 observations + 1 incertitude
6. **Cliquer** "Générer l'annonce"
7. **Annonce générée** → Modifier si besoin
8. **Publier** → Visible immédiatement dans /annonces

### Scénario 2 : Générer une relance de loyer
1. **Dashboard** → Voir "2 loyers en retard"
2. **Aller** à /loyers
3. **Identifier** Marie N'Guessan (30 jours de retard)
4. **Cliquer** "Générer une relance"
5. **Choisir** le ton : respectueux ou ferme
6. **Message généré** avec contexte complet
7. **Modifier** si besoin → Valider l'envoi
8. **Status** passe à "Enregistrée"

---

## 📊 Données mock cohérentes

Le prototype utilise un jeu de données fictives mais **cohérentes** pour démontrer tous les workflows :

- **6 logements** (3 libres, 3 occupés)
- **6 locataires** (4 à jour, 2 en retard)
- **Relations cohérentes** : chaque paiement → bon locataire → bon logement
- **Scénario crédible** : dates, montants, délais réalistes
- **Photos réelles** via Unsplash (domaine immobilier)

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
