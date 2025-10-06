# Backend - API de Gestion de Produits

API REST Node.js/Express avec MongoDB pour la gestion de produits.

## Installation

```bash
npm install
```

## Configuration

Créer un fichier `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/products_db
JWT_SECRET=votre_secret_jwt
JWT_EXPIRE=7d
NODE_ENV=development
```

## Démarrage

```bash
# Mode développement avec nodemon
npm run dev

# Mode production
npm start
```

## Scripts

- `node server.js` - Démarrer le serveur
- `npm run dev` - Mode développement avec auto-reload
- `npm run lint` - Vérifier le code avec ESLint

## Structure

- `config/` - Configuration (DB)
- `controllers/` - Logique métier
- `middleware/` - Middleware (auth, erreurs)
- `models/` - Modèles Mongoose
- `routes/` - Routes API
- `server.js` - Point d'entrée

## API Endpoints

Voir le README principal pour la liste complète des endpoints.