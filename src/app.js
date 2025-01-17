// Question: Comment organiser le point d'entrée de l'application ?
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?

const express = require('express');
const config = require('./config/env');
const db = require('./config/db');
require('dotenv').config();
const courseRoutes = require('./routes/courseRoutes');

const app = express();

async function startServer() {
  try {
    // TODO: Initialiser les connexions aux bases de données
    await db.connectMongo();
    console.log('Connexion à MongoDB réussie.');

    // TODO: Configurer les middlewares Express
    app.use(express.json()); // Middleware pour parser les requêtes en JSON
    app.use(express.urlencoded({ extended: true })); // Pour parser les données d'URL encodées
    
    // TODO: Monter les routes
    app.use('/', courseRoutes);

    // TODO: Démarrer le serveur
    const PORT = config.port || 3000;
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error('Erreur lors du démarrage du serveur :', error);
    process.exit(1); // Quitter le processus en cas d'erreur
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  // TODO: Implémenter la fermeture propre des connexions
  try {
    await db.disconnectMongo(); // Déconnexion propre de la base de données
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la fermeture des connexions :', error);
    process.exit(1);
  }
});

startServer();