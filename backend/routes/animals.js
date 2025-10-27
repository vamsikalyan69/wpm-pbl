const express = require('express');
const router = express.Router();
const Animal = require('../models/AnimalModel');

// GET /api/animals - list with optional search, pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = search
      ? { $or: [ { commonName: { $regex: search, $options: 'i' } }, { scientificName: { $regex: search, $options: 'i' } } ] }
      : {};

    const animals = await Animal.find(query);
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/animals/:id
router.get('/:id', async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: 'Not found' });
    res.json(animal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/animals
router.post('/', async (req, res) => {
  try {
    const animal = new Animal(req.body);
    const saved = await animal.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/animals/:id
router.patch('/:id', async (req, res) => {
  try {
    const updated = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/animals/:id
router.delete('/:id', async (req, res) => {
  try {
    await Animal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;