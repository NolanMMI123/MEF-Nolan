# 4. Contraintes techniques d'implémentation

## Frontend
- **Langage** : JavaScript (ES2023)
- **Framework** : React 19
- **Build** : Vite
  - Scripts: `dev`, `build`, `preview`, `lint`
- **UI** : Bootstrap 5.3.8 (+ React Bootstrap 2.10.10 pour les composants)
- **Routing** : React Router 7
- **Data fetching** : Fetch API natif (HTTP/JSON)
- **Animations** : Framer Motion 12.23.25
- **3D** : Three.js + React Three Fiber (pour la salle 3D)
- **Icônes** : Lucide React + React Icons
- **Lint/Format** : ESLint 9 (flat config) avec plugins React Hooks et React Refresh
- **Environnement** : Variables d'environnement Vite (`VITE_*`)

## Backend
- **Langage** : Java 21
- **Framework** : Spring Boot 3.4.12
  - Spring Web (REST)
  - Spring Security (authentification)
  - Spring Data MongoDB (accès aux données)
  - Spring Boot Actuator (monitoring)
- **Base de données** : MongoDB (via Docker)
- **ORM/ODM** : Spring Data MongoDB
- **Sécurité** : Spring Security + PasswordEncoder (BCrypt)
- **Utilitaires** : Lombok (réduction du code boilerplate)
- **Tests** : JUnit 5 + Spring Boot Test + Spring Security Test

## Infra / Outillage
- **Conteneurisation** : Docker + docker-compose
  - Service MongoDB (port 27017)
  - Volume persistant pour les données
- **IDE/Extensions VS Code** :
  - Java Coding Pack (extensions essentielles Java)
  - Spring Boot Dashboard
  - Spring Boot Extension Pack
  - Spring Boot Tools
  - Spring Initializr Java Support
- **Sécurité** : 
  - BCrypt pour le hachage des mots de passe
  - CORS configuré (actuellement : `http://localhost:5173`)
  - HTTPS recommandé en production
- **Observabilité** : Spring Boot Actuator (endpoints de monitoring)

## Architecture
- **Pattern** : Architecture en couches (Controllers → Repositories → MongoDB)
- **Communication** : REST API (HTTP/JSON)
- **Format de données** : JSON
- **Ports** :
  - Frontend : 5173 (Vite dev server)
  - Backend : 8080 (Spring Boot)
  - MongoDB : 27017

---

# 5. Implémentation des différents codes

## Git & branches
- **Branches** : `feat/*`, `fix/*`, `chore/*`
- **Commits** : Conventional Commits (`feat:`, `fix:`, `chore:`, etc.)
- **Pull Requests** : Recommandées pour la revue de code
- **Versioning** : SemVer (tags `v1.0.0`)

## Qualité
- **Frontend** : 
  - ESLint (flat config avec règles React, React Hooks)
  - Aucun formatter automatique configuré (Prettier peut être ajouté)
- **Backend** : 
  - SonarLint recommandé (local)
  - Checkstyle/Spotless peut être ajouté
- **Definition of Done** :
  - Tests unitaires recommandés sur code nouveau
  - Documentation API à maintenir à jour
  - Accessibilité de base (labels, focus, contrastes)
  - Aucune variable globale "magique"
  - Code lisible et maintenable

## Données & API
- **Base URL** : `http://localhost:8080/api`
- **Erreurs** : Format homogène JSON (`{message: "..."}` ou format détaillé)
- **Auth** : Authentification par email/password (BCrypt)
  - Admin : identifiant hardcodé (`admintxl` / `123456789`)
  - Utilisateurs : authentification via `/api/auth/login`
- **Rôles** : Gestion simple (ADMIN, USER) via localStorage côté frontend

## Structure des dossiers

### Frontend (React/)
```
React/
├── src/
│   ├── components/     # Composants réutilisables
│   ├── pages/          # Pages/Views
│   ├── utils/          # Utilitaires et helpers
│   ├── App.jsx         # Configuration des routes
│   └── main.jsx        # Point d'entrée
├── public/             # Assets statiques
└── package.json
```

### Backend (Back-MEF/)
```
Back-MEF/
├── src/main/java/com/monespaceformation/backend/
│   ├── controller/     # Contrôleurs REST
│   ├── model/          # Entités MongoDB
│   ├── repository/     # Repositories Spring Data
│   ├── dto/            # Data Transfer Objects
│   ├── config/         # Configuration (Security, etc.)
│   └── BackendApplication.java
├── src/main/resources/
│   └── application.properties
└── pom.xml
```

## Notes d'évolution future

### Technologies à considérer pour l'avenir
- **Migration vers SQL** : Si migration vers MySQL/PostgreSQL prévue
  - Remplacer Spring Data MongoDB par Spring Data JPA
  - Ajouter Flyway pour les migrations
  - Adapter le MPD (Modèle Physique de Données)
- **Amélioration Frontend** :
  - React Query (TanStack Query) pour le cache et la gestion d'état serveur
  - Axios pour les requêtes HTTP (au lieu de Fetch natif)
  - React Hook Form + Yup pour la validation des formulaires
- **Documentation API** :
  - Ajouter springdoc-openapi (Swagger UI) pour la documentation interactive
- **Tests** :
  - Testcontainers pour les tests d'intégration avec MongoDB
  - Tests E2E (Cypress ou Playwright)
- **CI/CD** :
  - GitHub Actions pour l'automatisation
  - Build et déploiement automatiques


