// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : 
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : 

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;


async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB
  // Gérer les erreurs et les retries
  if (!mongoClient) {
    mongoClient = new MongoClient(config.mongodb.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
      await mongoClient.connect();
      console.log('Connexion à MongoDB réussie.');
    } catch (e) {
      console.error('Erreur lors de la connexion à MongoDB :', e);
      throw e;
    }
  }
  return mongoClient;
}

// Fonction pour se déconnecter de MongoDB
async function disconnectMongo() {
  try {
    if (mongoClient) {
      await mongoClient.close(); // Fermeture propre de la connexion
      console.log('Déconnexion de MongoDB réussie.');
    } else {
      console.log('Aucune connexion MongoDB active à fermer.');
    }
  } catch (e) {
    console.error('Erreur lors de la déconnexion de MongoDB :', e);
  }
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
  disconnectMongo
};