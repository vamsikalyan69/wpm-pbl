const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  commonName: {
    type: String,
    required: [true, 'Common name is required'],
    trim: true
  },
  scientificName: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  habitat: [{
    type: String,
    trim: true
  }],
  diet: {
    type: String,
    trim: true
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    caption: String
  }],
  conservation: {
    status: String,
    threats: [String],
    measures: [String]
  },
  classification: {
    kingdom: String,
    phylum: String,
    class: String,
    order: String,
    family: String,
    genus: String,
    species: String
  },
  articles: [{
    title: String,
    content: String,
    author: String,
    date: Date
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Animal', animalSchema);
