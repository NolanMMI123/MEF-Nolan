# Mon Espace Formation — Front-end (React)

## Description

**Mon Espace Formation** est une application web moderne de type SPA (Single Page Application) développée avec **React** et **Vite**. Elle propose une plateforme complète de gestion de formations en ligne, intégrant :

- Une interface utilisateur intuitive pour la consultation et l'inscription aux formations
- Une interface d'administration complète pour la gestion des formations, sessions, formateurs et attestations
- Une salle 3D interactive immersive utilisant Three.js pour une expérience utilisateur innovante

## Pile Technique

### Framework & Build Tools
- **React** 18+ (v19.2.0)
- **Vite** 7.3.0 (Build tool et serveur de développement)

### Bibliothèques 3D
- **Three.js** 0.182.0 (Moteur 3D)
- **@react-three/fiber** 9.5.0 (Wrapper React pour Three.js)
- **@react-three/drei** 10.7.7 (Utilitaires et helpers pour React Three Fiber)
- **@react-three/rapier** 2.2.0 (Physique 3D)

### UI & Styling
- **Bootstrap** 5.3.8 & **react-bootstrap** 2.10.10 (Framework CSS et composants)
- **CSS3** (Modules et variables CSS personnalisées)
- **framer-motion** 12.23.25 (Animations)

### Icônes
- **Lucide React** 0.562.0
- **react-icons** 5.5.0 (FontAwesome, etc.)

### Routing & Navigation
- **react-router-dom** 7.10.1 (Gestion des routes)

### Utilitaires
- **jspdf** 4.0.0 (Génération de PDF pour les attestations)
- **@emailjs/browser** 4.4.1 (Envoi d'emails)

### Client HTTP
- **fetch API** (natif) pour la communication avec l'API REST backend

## Prérequis

- **Node.js** (version 16 ou supérieure recommandée)
- **npm** ou **yarn** (gestionnaire de paquets)

## Installation

1. **Cloner le dépôt** (si ce n'est pas déjà fait)
   ```bash
   git clone <url-du-repo>
   cd Mon-Espace-Formation-main/React
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

## Lancement

### Mode Développement

```bash
npm run dev
```

L'application sera accessible à l'adresse : **http://localhost:5173**

### Build de Production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`.

### Prévisualisation du Build

```bash
npm run preview
```

## Configuration de l'API

L'application front-end communique avec une **API REST Spring Boot** hébergée sur le backend.

### URL de Base de l'API

Par défaut, l'application est configurée pour communiquer avec :
```
http://localhost:8080/api
```

### Endpoints Principaux

- **Formations** : `GET /api/trainings`
- **Sessions** : `GET /api/sessions`
- **Inscriptions** : `POST /api/inscriptions`
- **Authentification** : `POST /api/auth/login`
- **Notifications** : `GET /api/notifications`
- **Attestations** : Génération via `jsPDF` côté client

### Configuration Personnalisée

Si votre backend est hébergé sur un autre port ou domaine, modifiez les URLs dans les composants qui effectuent des appels API (ex: `AdminLayout.jsx`, `Dashboard.jsx`, etc.).

## Structure du Projet

```
React/
├── public/                 # Assets statiques (images, modèles 3D)
│   ├── adminlogo.png
│   ├── vignette_MEF.png
│   └── salle.glb          # Modèle 3D de la salle
├── src/
│   ├── components/
│   │   ├── Footer.jsx       # Pied de page (Copyright)
│   │   └── Header.jsx       # Barre de navigation principale
│   ├── data/
│   │   └── boxes.json       # Source de données des menus
│   ├── pages/
│   │   ├── Commande.jsx     # Page de calcul du prix total
│   │   ├── Home.jsx         # Page d'accueil (Liste des menus)
│   │   ├── MenuDetails.jsx  # Page de détail d'un menu
│   │   └── Saveurs.jsx      # Page de recherche par saveurs
│   ├── App.jsx              # Configuration des routes
│   ├── main.jsx             # Point d'entrée (Import Bootstrap)
│   └── index.css
├── package.json
└── README.md
