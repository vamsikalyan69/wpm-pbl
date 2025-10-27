const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

// @route   GET /api/animals
// @desc    Get all animals with optional search and pagination
// @access  Public
router.get('/', animalController.getAllAnimals);

// @route   GET /api/animals/:id
// @desc    Get single animal by ID
// @access  Public
router.get('/:id', animalController.getAnimalById);

// @route   POST /api/animals
// @desc    Create new animal
// @access  Public
router.post('/', animalController.createAnimal);

// @route   PATCH /api/animals/:id
// @desc    Update animal
// @access  Public
router.patch('/:id', animalController.updateAnimal);

// @route   DELETE /api/animals/:id
// @desc    Delete animal
// @access  Public
router.delete('/:id', animalController.deleteAnimal);

module.exports = router;
