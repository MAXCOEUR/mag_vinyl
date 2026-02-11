# Guide de Configuration et d'Utilisation

## 1. Configuration du fichier `.env`

Créez ou mettez à jour le fichier `.env` à la racine du projet avec la configuration suivante :

```env
# --- Configuration Serveur ---
SERVER_PORT=8000
API_DEFAUT_LIMIT=50
JWT_SECRET=d2a74c5468b2998e5cb2f31c9f722f2d

# --- Configuration MongoDB Locale ---
MONGO_PORT=27017
MONGO_USER=maxencechachane_db_user
MONGO_PASS=grqpmf8TCadyQQl1
MONGO_DATABASE=mag_vinyls
```

## 2. Démarrer le serveur avec Docker

### Sur Windows :
```bash
docker-compose up --build
```

### Sur Linux :
```bash
docker compose up --build
```

> **Note** : Le serveur démarre sur `http://localhost:8000`

## 3. Configurer Bruno

### 3.1 Ouvrir Bruno
- Lancez l'application **Bruno**

### 3.2 Importer la collection
1. Dans Bruno, cliquez sur **File** → **Open Collection**
2. Naviguez vers le dossier `vinyls/` et ouvrez la collection `collection.bru`

## 4. Créer les rôles (avec Bruno)

### 4.1 Créer le rôle "Gérant"
1. Allez dans l'onglet **roles** → **role Gérant.bru**
2. Cliquez sur **Send**
3. Le rôle "gérant" est créé avec les permissions :
   - `GET, PUT, POST, DELETE` sur `groups`
   - `GET, POST, PUT, DELETE` sur `vinyls`

### 4.2 Créer le rôle "Disquaire"
1. Allez dans l'onglet **roles** → **role Disquaire.bru**
2. Cliquez sur **Send**
3. Le rôle "disquaire" est créé avec les permissions :
   - `GET, PUT` sur `groups`
   - `GET, PUT` sur `vinyls`

## 5. Créer un utilisateur et se connecter

### 5.1 Créer un un utilisateur (Register)
1. Allez dans **auth** → **register.bru**
2. Modifiez le body JSON avec vos identifiants :
   ```json
   {
     "email": "votre-email@example.com",
     "password": "votre-mot-de-passe"
   }
   ```
3. Cliquez sur **Send**
4. Vous recevrez une réponse avec l'ID utilisateur créé

### 5.2 Se connecter (Login)
1. Allez dans **auth** → **login.bru**
2. Modifiez le body JSON :
   ```json
   {
     "email": "votre-email@example.com",
     "password": "votre-mot-de-passe"
   }
   ```
3. Cliquez sur **Send**
4. Vous recevrez un **token JWT** dans l'header `Authorization`

### 5.3 Utiliser le token pour les requêtes protégées
1. Copiez le token JWT reçu à la connexion
2. Pour chaque requête aux endpoints protégés (vinyls, groups), ajoutez le header :
   ```
   Authorization: <votre-token-jwt>
   ```

> **Note** : Le token expire dans **5 minutes**. Vous devrez vous reconnecter après.

## 6. Tester les endpoints

Une fois authentifié, vous pouvez tester les endpoints en fonction de votre rôle :

### Si vous avez le rôle "Gérant" :
- ✅ **GET** `/api/groups` - Lister tous les groupes
- ✅ **POST** `/api/groups` - Créer un groupe
- ✅ **PUT** `/api/groups/:id` - Éditer un groupe
- ✅ **DELETE** `/api/groups/:id` - Supprimer un groupe
- ✅ **GET** `/api/vinyls` - Lister tous les vinyls
- ✅ **POST** `/api/vinyls` - Créer un vinyl
- ✅ **PUT** `/api/vinyls/:id` - Éditer un vinyl
- ✅ **DELETE** `/api/vinyls/:id` - Supprimer un vinyl

### Si vous avez le rôle "Disquaire" :
- ✅ **GET** `/api/groups` - Lister tous les groupes
- ✅ **PUT** `/api/groups/:id` - Éditer un groupe
- ❌ **POST** `/api/groups` - Interdit
- ❌ **DELETE** `/api/groups/:id` - Interdit
- ✅ **GET** `/api/vinyls` - Lister tous les vinyls
- ✅ **PUT** `/api/vinyls/:id` - Éditer un vinyl
- ❌ **POST** `/api/vinyls` - Interdit
- ❌ **DELETE** `/api/vinyls/:id` - Interdit

## 7. Troubleshooting

### Erreur: "No token provided" 
→ Assurez-vous d'avoir ajouté le header `Authorization` avec votre token

### Erreur: "Invalid token"
→ Vous devez vous reconnecter (le token a expiré)

### Erreur: "Forbidden"
→ Votre rôle n'a pas les permissions pour cette action
