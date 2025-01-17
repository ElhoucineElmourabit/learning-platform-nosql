# Questions et Réponses

---

### **Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?**
**Réponse :**  
Pour centraliser la gestion des connexions, améliorer la réutilisabilité du code et simplifier la maintenance en cas de changements dans la configuration ou la logique de connexion.

---

### **Question : Comment gérer proprement la fermeture des connexions ?**
**Réponse :**  
En combinant des gestionnaires d'événements (comme `process.on('exit')`) et des blocs `try-finally` afin d'assurer la fermeture des connexions, y compris en cas d'erreur.

---

### **Question : Pourquoi est-il important de valider les variables d'environnement au démarrage ?**
**Réponse :**  
Pour s'assurer que l'application dispose de toutes les configurations nécessaires pour fonctionner correctement et éviter les erreurs imprévues en production.

---

### **Question : Que se passe-t-il si une variable requise est manquante ?**
**Réponse :**  
L'application devrait générer une erreur explicite dès le démarrage pour informer que la configuration est incomplète.

---

### **Question : Quelle est la différence entre un contrôleur et une route ?**
**Réponse :**  
Une route définit les points d'entrée HTTP (comme `GET` ou `POST`) et fait appel au contrôleur, tandis que le contrôleur contient la logique métier pour traiter la requête et générer une réponse.

---

### **Question : Pourquoi séparer la logique métier des routes ?**
**Réponse :**  
Pour améliorer la lisibilité, la réutilisabilité, et faciliter les tests unitaires en isolant la logique des dépendances liées aux routes.

---

### **Question : Pourquoi séparer les routes dans différents fichiers ?**
**Réponse :**  
Pour organiser le code de manière modulaire, éviter les fichiers volumineux et faciliter la gestion des routes spécifiques à différentes parties de l'application.

---

### **Question : Comment organiser les routes de manière cohérente ?**
**Réponse :**  
En regroupant les routes par fonctionnalité ou module, et en adoptant une structure hiérarchique logique.

---

### **Question : Pourquoi créer des services séparés ?**
**Réponse :**  
Pour centraliser la logique commune et simplifier le remplacement ou la modification de l'implémentation si nécessaire.

---

### **Question : Comment gérer efficacement le cache avec Redis ?**
**Réponse :**  
En définissant des politiques d'expiration adaptées (comme `TTL`), en utilisant des structures de données optimisées (par exemple, des ensembles ou des hachages).

---

### **Question : Quelles sont les bonnes pratiques pour les clés Redis ?**
**Réponse :**  
Utiliser des noms de clés descriptifs, limiter leur durée de vie avec des TTL, éviter les clés volumineuses, et privilégier des structures adaptées aux besoins (ex. hashes, lists).

---

### **Question : Comment organiser le point d'entrée de l'application ?**
**Réponse :**  
En limitant le fichier à l'importation des modules nécessaires, à la configuration initiale et au démarrage du serveur pour maintenir une structure claire et concise.

---

### **Question : Quelle est la meilleure façon de gérer le démarrage de l'application ?**
**Réponse :**  
En utilisant une approche asynchrone pour gérer les erreurs au démarrage en utilisant des blocs `try-catch`.

---

### **Question : Quelles sont les informations sensibles à ne jamais commiter ?**
**Réponse :**  
Les clés API, les mots de passe, les chaînes de connexion, et toute information confidentielle liée au projet.

---

### **Question : Pourquoi utiliser des variables d'environnement ?**
**Réponse :**  
Pour séparer la configuration du code, simplifier les déploiements dans différents environnements (développement, test, production) et protéger les informations sensibles.
