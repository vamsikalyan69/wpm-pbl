const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  commonName: String,
  scientificName: String,
  description: String,
  habitat: [String],
  diet: String,
    images: [{
    url: { type: String, required: true },
    caption: { type: String }
  }],
});

module.exports = mongoose.model('Animal', animalSchema);