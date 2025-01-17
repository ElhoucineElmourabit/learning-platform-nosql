// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const { cacheData, getCachedData, deleteCachedData } = require('../services/redisService');


async function createCourse(req, res) {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: 'Les champs titre, description et catégorie sont obligatoires.' });
    }

    const courseData = { title, description, category, createdAt: new Date() };
    const insertedId = await mongoService.insert('Courses', courseData);

    // Invalidate the cache for the list of courses
    await deleteCachedData('courses:list');

    res.status(201).json({ message: 'Cours créé avec succès.', courseId: insertedId });
  } catch (e) {
    console.error('Erreur lors de la création du cours :', e);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
}

// Récupèrer un cours à partir de son ID
async function getCourseById(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'ID de cours manquant.' });
    }

    const cacheKey = `course:${id}`;

    // Check if the data is in the cache
    let course = await getCachedData(cacheKey);
    if (course) {
      console.log('Données récupérées du cache.');
      return res.status(200).json(course);
    }

    // If not in cache, fetch from MongoDB
    course = await mongoService.findOneById('Courses', id);
    if (!course) {
      return res.status(404).json({ message: 'Cours introuvable.' });
    }

    // Cache the data for future requests
    await cacheData(cacheKey, course, 3600); // Cache for 1 hour

    res.status(200).json(course);
  } catch (error) {
    console.error('Erreur lors de la récupération du cours :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
}

// Récupèrer tous les cours dans la base de données
async function getAllCourses(req, res) {
  const cacheKey = 'courses:list';
  
    try {
      // Check if the data is in the cache
      let courses = await getCachedData(cacheKey);
      if (courses) {
        console.log('Données récupérées du cache.');
        return res.status(200).json(courses);
      }
  
      // If not in cache, fetch from MongoDB
      courses = await mongoService.findMany('Courses');
      if (!courses) {
        return res.status(404).json({ message: 'Aucun cours trouvé.' });
      }
  
      // Cache the data for future requests
      await cacheData(cacheKey, courses, 3600); // Cache for 1 hour
  
      res.status(200).json(courses);
    } catch (error) {
      console.error('Erreur lors de la récupération des cours :', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
}

// Mettre à jour les informations d'un cours
async function updateCourse(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID de cours manquant.' });
    }

    const updatedCount = await mongoService.update('Courses', { _id: new ObjectId(id) }, updateData);

    if (updatedCount === 0) {
      return res.status(404).json({ message: 'Cours introuvable ou aucun changement détecté.' });
    }

    // Invalidate the cache for the updated course and the list of courses
    await deleteCachedData(`course:${id}`);
    await deleteCachedData('courses:list');

    res.status(200).json({ message: 'Cours mis à jour avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du cours :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
}

// Supprimer un cours à partir de son ID
async function deleteCourse(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'ID de cours manquant.' });
    }

    const deletedCount = await mongoService.deleteOne('Courses', { _id: new ObjectId(id) });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Cours introuvable.' });
    }

    // Invalidate the cache for the deleted course and the list of courses
    await deleteCachedData(`course:${id}`);
    await deleteCachedData('courses:list');

    res.status(200).json({ message: 'Cours supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression du cours :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
}

// Récupèrer des statistiques sur les cours
async function getCourseStats(req, res) {
  try {
      const stats = await mongoService.getCourseStats();

      res.status(200).json(stats);
  } catch (error) {
      console.error('Erreur lors de la récupération des statistiques des cours :', error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des statistiques.' });
  }
}


// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
    createCourse,
    getCourseById,
    getAllCourses,
    updateCourse,
    deleteCourse,
    getCourseStats
};