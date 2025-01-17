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
  mongoClient = new MongoClient(config.mongodb.uri);
  
  try{
    await mongoClient.connect();

    await listDatabases(mongoClient);
  } catch(e){
    console.error(e);
  } finally{
    await mongoClient.close();
  }

}

connectMongo().catch(console.error);

async function listDatabases(mongoClient){
  const databasesList = await mongoClient.db().admin().listDatabases();

  console.log("Databases: ");
  databasesList.databases.forEach(db => {
    console.log(` ${db.name}`);
  });
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo
};