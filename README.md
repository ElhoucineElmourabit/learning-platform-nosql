# Learning Platform Template

## Projet NoSQL

---

## Prérequis

- **Node.js** (version 14 ou supérieure)
- **MongoDB**
- **Redis**

---

## Installation

### Étape 1 : Cloner le dépôt
Clonez le dépôt GitHub sur votre machine locale :

```sh
git clone https://github.com/ElhoucineElmourabit/learning-platform-nosql.git
cd learning-platform-nosql
```

### Étape 2 : Installer les dépendances
Installez les dépendances de l'application :

```sh
npm install
```

### Étape 3 : Créer le fichier `.env`
Créez un fichier nommé `.env` à la racine du projet et ajoutez les URI de MongoDB et Redis :

```env
MONGODB_URI="<votre_connection_string>"
REDIS_URI=redis://<votre_redis_host>:<votre_redis_port>
```

### Étape 4 : Démarrer l'application
Démarrez l'application :

```sh
nodemon start
```

---

## Questions et Réponses

### **Pourquoi créer un module séparé pour les connexions aux bases de données ?**
**Réponse :**  
Pour centraliser la gestion des connexions, améliorer la réutilisabilité du code et simplifier la maintenance en cas de changements dans la configuration ou la logique de connexion.

---

### **Comment gérer proprement la fermeture des connexions ?**
**Réponse :**  
En combinant des gestionnaires d'événements (comme `process.on('exit')`) et des blocs `try-finally` afin d'assurer la fermeture des connexions, y compris en cas d'erreur.

---

### **Pourquoi est-il important de valider les variables d'environnement au démarrage ?**
**Réponse :**  
Pour s'assurer que l'application dispose de toutes les configurations nécessaires pour fonctionner correctement et éviter les erreurs imprévues en production.

---

### **Que se passe-t-il si une variable requise est manquante ?**
**Réponse :**  
L'application devrait générer une erreur explicite dès le démarrage pour informer que la configuration est incomplète.

---

### **Quelle est la différence entre un contrôleur et une route ?**
**Réponse :**  
Une route définit les points d'entrée HTTP (comme `GET` ou `POST`) et fait appel au contrôleur, tandis que le contrôleur contient la logique métier pour traiter la requête et générer une réponse.

---

### **Pourquoi séparer la logique métier des routes ?**
**Réponse :**  
Pour améliorer la lisibilité, la réutilisabilité, et faciliter les tests unitaires en isolant la logique des dépendances liées aux routes.

---

### **Pourquoi séparer les routes dans différents fichiers ?**
**Réponse :**  
Pour organiser le code de manière modulaire, éviter les fichiers volumineux et faciliter la gestion des routes spécifiques à différentes parties de l'application.

---

### **Comment organiser les routes de manière cohérente ?**
**Réponse :**  
En regroupant les routes par fonctionnalité ou module, et en adoptant une structure hiérarchique logique.

---

### **Pourquoi créer des services séparés ?**
**Réponse :**  
Pour centraliser la logique commune et simplifier le remplacement ou la modification de l'implémentation si nécessaire.

---

### **Comment gérer efficacement le cache avec Redis ?**
**Réponse :**  
En définissant des politiques d'expiration adaptées (comme `TTL`) et en utilisant des structures de données optimisées (par exemple, des ensembles ou des hachages).

---

### **Quelles sont les bonnes pratiques pour les clés Redis ?**
**Réponse :**  
Utiliser des noms de clés descriptifs, limiter leur durée de vie avec des TTL, éviter les clés volumineuses et privilégier des structures adaptées aux besoins (ex. hashes, lists).

---

### **Comment organiser le point d'entrée de l'application ?**
**Réponse :**  
En limitant le fichier à l'importation des modules nécessaires, à la configuration initiale et au démarrage du serveur pour maintenir une structure claire et concise.

---

### **Quelle est la meilleure façon de gérer le démarrage de l'application ?**
**Réponse :**  
En utilisant une approche asynchrone pour gérer les erreurs au démarrage avec des blocs `try-catch`.

---

### **Quelles sont les informations sensibles à ne jamais commiter ?**
**Réponse :**  
Les clés API, les mots de passe, les chaînes de connexion et toute information confidentielle liée au projet.

---

### **Pourquoi utiliser des variables d'environnement ?**
**Réponse :**  
Pour séparer la configuration du code, simplifier les déploiements dans différents environnements (développement, test, production) et protéger les informations sensibles.

---

## Utilisation

### Récupérer tous les cours
Pour récupérer tous les cours, envoyez une requête `GET` à :

```http
http://localhost:3000/courses
```
![Screenshot 1](https://github.com/ElhoucineElmourabit/learning-platform-nosql/blob/main/public/getAllCourses.png)

### Ajouter un nouveau cours
Pour ajouter un nouveau cours, envoyez une requête `POST` avec les données du cours à :

```http
http://localhost:3000/courses
```
![Screenshot 2](https://github.com/ElhoucineElmourabit/learning-platform-nosql/blob/main/public/createCourse.png)

### Mettre à jour un cours
Pour mettre à jour un cours, envoyez une requête `PUT` avec les données mises à jour à :

```http
http://localhost:3000/courses/<id_du_cours>
```
![Screenshot 3](https://github.com/ElhoucineElmourabit/learning-platform-nosql/blob/main/public/updateCourse.png)  
![Screenshot 4](https://github.com/ElhoucineElmourabit/learning-platform-nosql/blob/main/public/checkAfterUpdate.png)

### Supprimer un cours
Pour supprimer un cours, envoyez une requête `DELETE` à :

```http
http://localhost:3000/courses/<id_du_cours>
```
![Screenshot 5](https://github.com/ElhoucineElmourabit/learning-platform-nosql/blob/main/public/deleteCourse.png)  
![Screenshot 6](https://github.com/ElhoucineElmourabit/learning-platform-nosql/blob/main/public/checkAfterDelete.png)

### Vérifier les données dans Redis
Pour vérifier les données mises en cache dans Redis, utilisez la commande `GET courses:list` dans Redis CLI :

```sh
redis-cli
GET courses:list
```
![Screenshot 7](https://github.com/ElhoucineElmourabit/learning-platform-nosql/blob/main/public/getAllCoursesbutiwillcheckredis.png)  
![Screenshot 8](https://github.com/ElhoucineElmourabit/learning-platform-nosql/blob/main/public/redisshowsgetall.png)
---

## Structure du projet

```plaintext
learning-platform-nosql/
├── src/
│   ├── config/
│   │   └── db.js
│   │   └── env.js
│   ├── controllers/
│   │   └── courseController.js
│   ├── routes/
│   │   └── courseRoutes.js
│   ├── services/
│   │   └── mongoService.js
│   │   └── redisService.js
│   ├── app.js
├── .env
├── package.json
├── README.md
```

---

## Choix techniques

### Utilisation des variables d'environnement pour la configuration
Les variables d'environnement sont utilisées pour séparer la configuration du code, simplifier les déploiements dans différents environnements (développement, test, production) et protéger les informations sensibles.

### Séparation claire des responsabilités
- **Routes** : Définissent les points d'entrée de l'API.
- **Contrôleurs** : Gèrent la logique métier.
- **Services** : Gèrent les interactions avec les bases de données et autres services externes.

### Gestion propre des connexions aux bases de données
Les connexions à MongoDB et Redis sont gérées proprement avec des fonctions de connexion et de déconnexion.

### Organisation modulaire du code
Le code est organisé de manière modulaire pour faciliter la maintenance et l'évolutivité.

### Gestion des erreurs et des cas limites
Les erreurs et les cas limites sont gérés avec des blocs `try-catch` et des messages d'erreur appropriés.

---

## Technologies utilisées

### Node.js et Express
- **Node.js** : Une plateforme JavaScript côté serveur permettant de créer des applications réseau rapides et évolutives. Il utilise un modèle d'E/S non bloquant et événementiel, idéal pour les applications en temps réel.
- **Express** : Un framework web minimaliste pour Node.js qui simplifie le développement de serveurs web et d'API en fournissant une structure robuste.

### MongoDB
- **Base de données NoSQL** : MongoDB est orienté documents, permettant de stocker des données sous forme de documents JSON pour une grande flexibilité.
- **Scalabilité** : Conçu pour être facilement scalable, il gère efficacement de grandes quantités de données et de trafic.
- **Performance** : Optimisé pour les opérations de lecture et d'écriture.

### Redis
- **Cache en mémoire** : Redis est une base de données en mémoire, idéale pour améliorer les performances de l'application.
- **Support des structures de données** : Redis prend en charge diverses structures telles que les chaînes, listes, ensembles, et hachages.
- **Expiration des données** : Permet de définir des durées de vie (TTL) pour les caches temporaires.