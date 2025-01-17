// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :

const { connectRedis } = require('../config/db');

// Fonctions utilitaires pour Redis
// Fonction pour mettre en cache des données dans Redis
async function cacheData(key, data, ttl) {
    // TODO: Implémenter une fonction générique de cache
    try {
      const client = await connectRedis();
      // Convertir les données en chaîne JSON et les mettre en cache avec une durée de vie (TTL)
      await client.set(key, JSON.stringify(data), {
        EX: ttl
      });
      console.log(`Données mises en cache avec la clé : ${key}`);
    } catch (e) {
      console.error('Erreur lors de la mise en cache des données :', e);
    }
  }

  // Fonction pour récupérer des données mises en cache dans Redis
  async function getCachedData(key) {
    try {
      const client = await connectRedis();
      const data = await client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Erreur lors de la récupération des données mises en cache :', e);
    }
  }

  // Fonction pour supprimer des données mises en cache dans Redis
  async function deleteCachedData(key) {
    try {
      const client = await connectRedis();
      await client.del(key);
      console.log(`Données supprimées du cache avec la clé : ${key}`);
    } catch (e) {
      console.error('Erreur lors de la suppression des données mises en cache :', e);
    }
  }

  
  module.exports = {
    // TODO: Exporter les fonctions utilitaires
    cacheData,
    getCachedData,
    deleteCachedData
  };