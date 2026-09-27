# Locat AI

Prototype web Locat AI pour le hackathon GOMYCODE × NVIDIA. L'application aide un gestionnaire immobilier à visualiser son portefeuille, suivre les loyers, publier des logements disponibles et utiliser une IA pour analyser des photos, rédiger une annonce et préparer une relance.

## Parcours de démonstration

- `/` : tableau de bord gestionnaire.
- `/logements` : portefeuille filtrable des logements.
- `/logements/a02` : workflow Locat AI Vision puis génération d'annonce pour le logement A02.
- `/loyers` : suivi des paiements et relance IA avec validation humaine.
- `/annonces` : vitrine publique des annonces publiées.
- `/annonces/listing-b01` : détail d'une annonce publique (les annonces seeded utilisent aussi `listing-b01` et `listing-h02`).

Les données métier sont actuellement mockées dans `lib/mock-data.ts`. Les annonces générées et les relances envoyées sont persistées dans le `localStorage` du navigateur pour le prototype uniquement.

## Prérequis

- Node.js compatible avec Next.js 16
- pnpm 12+

## Installation et développement

```bash
pnpm install
pnpm dev
```

Ouvrir ensuite `http://localhost:3000`.

## IA NVIDIA

L'architecture utilise un `MockAIProvider` par défaut afin que la démo fonctionne sans secret. Pour activer le provider NVIDIA côté serveur, définir les variables suivantes dans `.env.local` et dans les variables d'environnement Vercel :

```env
NVIDIA_API_KEY=your_server_side_key
NVIDIA_MODEL=your_model_id
```

La clé ne doit jamais être préfixée par `NEXT_PUBLIC_`, commitée ou exposée au navigateur. `NVIDIA_MODEL` doit correspondre à un modèle compatible avec l'endpoint NVIDIA configuré dans `lib/ai/nvidia-provider.ts`. En l'absence de clé, le fallback mock reste le comportement attendu du prototype.

## Architecture

- Next.js App Router et React.
- Routes API serveur sous `app/api/ai/`.
- Validation et erreurs partagées dans `lib/ai/http.ts`.
- Schémas de sorties IA dans `lib/ai/schemas.ts`.
- Sélection du provider dans `lib/ai/provider.ts`.
- Persistance de prototype dans `lib/listing-storage.ts`.
- UI et tokens dans `app/globals.css`.

## Vérification

```bash
pnpm build
pnpm exec tsc --noEmit
```

Le projet ne définit pas actuellement de script `lint` dans `package.json`; le lint doit donc être ajouté avant une industrialisation, mais il n'est pas requis pour le scénario de démonstration actuel.

## Limites connues du prototype

- Pas d'authentification ni de base de données.
- Pas d'envoi réel de SMS, email ou WhatsApp : la relance est seulement générée puis marquée comme envoyée localement.
- Les images de démonstration sont des URLs Unsplash distantes.
- Le provider NVIDIA réel dépend de la disponibilité de la clé, du modèle et du quota ; le fallback mock couvre la présentation hors connexion.
- Les données ne sont pas multi-utilisateurs et ne doivent pas être utilisées pour gérer de vrais locataires ou paiements.

## Sécurité

Les routes IA valident les entrées, gardent les secrets côté serveur, limitent les identifiants reçus et renvoient des erreurs publiques génériques. Avant une mise en production, ajouter une authentification, une base de données avec contrôle d'accès, une limitation de débit et une gestion de secrets dédiée.

## Licence

Prototype de hackathon, non destiné à la production sans durcissement complémentaire.
