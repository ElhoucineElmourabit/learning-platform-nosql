// Question: Pourquoi créer des services séparés ?
// Réponse: 

const { ObjectId } = require('mongodb');
const { db } = require("../config/db");

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
    try {
      const client = await connectMongo();
      const collection = client.db().collection(collectionName);
  
      if (!ObjectId.isValid(id)) {
        throw new Error('ID invalide');
      }
  
      const document = await collection.findOne({ _id: new ObjectId(id) });
      return document;
    } catch (e) {
      console.error('Erreur lors de la recherche par ID :', e);
    }
}

// Fonction générique pour rechercher plusieurs documents
async function findMany(collectionName, query = {}) {
  try {
      const client = await connectMongo();
      const collection = client.db().collection(collectionName);

      const documents = await collection.find(query).toArray();
      return documents;
  } catch (e) {
      console.error('Erreur lors de la recherche de plusieurs documents :', e);
  }
}

// Fonction générique pour insérer un document
async function insert(collectionName, document) {
  try {
      const client = await connectMongo();
      const collection = client.db().collection(collectionName);

      const result = await collection.insertOne(document);
      return result.insertedId;
  } catch (e) {
      console.error('Erreur lors de l\'insertion du document :', e);
  }
}

// Fonction générique pour mettre à jour un document
async function update(collectionName, query, updateDoc) {
  try {
      const client = await connectMongo();
      const collection = client.db().collection(collectionName);

      const result = await collection.updateMany(query, { $set: updateDoc });
      return result.modifiedCount;
  } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
      throw error;
  }
}

// Fonction générique pour supprimer un document
async function deleteOne(collectionName, query) {
  try {
      const client = await connectMongo();
      const collection = client.db().collection(collectionName);

      const result = await collection.deleteOne(query);
      return result.deletedCount;
  } catch (e) {
      console.error('Erreur lors de la suppression :', e);
  }
}


// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById,
  findMany,
  insert,
  update,
  deleteOne
};