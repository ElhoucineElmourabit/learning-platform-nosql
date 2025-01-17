// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : 
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: 

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Route pour créer un cours
router.post('/courses', courseController.createCourse);

// Route pour récupérer un cours par ID
router.get('/courses/:id', courseController.getCourseById);

// Route pour récupérer les statistiques des cours
router.get('/courses/stats', courseController.getCourseStats);

// Route pour récupérer tous les cours
router.get('/courses', courseController.getAllCourses);

// Route pour mettre à jour un cours
router.put('/courses/:id', courseController.updateCourse);

// Route pour supprimer un cours
router.delete('/courses/:id', courseController.deleteCourse);

module.exports = router;