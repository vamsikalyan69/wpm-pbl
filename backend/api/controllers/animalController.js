const Animal = require('../models/Animal');

// Get all animals with optional search and pagination
exports.getAllAnimals = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { commonName: { $regex: search, $options: 'i' } },
          { scientificName: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const animals = await Animal.find(query)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Animal.countDocuments(query);

    res.json({
      success: true,
      count: animals.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: animals
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch animals', 
      message: error.message 
    });
  }
};

// Get single animal by ID
exports.getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    
    if (!animal) {
      return res.status(404).json({ 
        success: false,
        error: 'Animal not found' 
      });
    }
    
    res.json({
      success: true,
      data: animal
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch animal', 
      message: error.message 
    });
  }
};

// Create new animal
exports.createAnimal = async (req, res) => {
  try {
    const animal = new Animal(req.body);
    await animal.save();
    
    res.status(201).json({
      success: true,
      message: 'Animal created successfully',
      data: animal
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: 'Failed to create animal', 
      message: error.message 
    });
  }
};

// Update animal
exports.updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!animal) {
      return res.status(404).json({ 
        success: false,
        error: 'Animal not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Animal updated successfully',
      data: animal
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: 'Failed to update animal', 
      message: error.message 
    });
  }
};

// Delete animal
exports.deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    
    if (!animal) {
      return res.status(404).json({ 
        success: false,
        error: 'Animal not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Animal deleted successfully',
      data: animal
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete animal', 
      message: error.message 
    });
  }
};
