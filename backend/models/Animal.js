const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  commonName: String,
  scientificName: String,
  description: String,
  habitat: [String],
  diet: String,
  images: [{ url: String }]
});

module.exports = mongoose.model('Animal', animalSchema);
    measures: [String]
  },
  images: [{
    url: String,
    caption: String
  }],
  articles: [{
    title: String,
    content: String,
    author: String,
    date: Date
  }],
  createdAt: { type: Date, default: Date.now }
    measures: [String]
  },
  images: [{
    url: String,
    caption: String
  }],
  articles: [{
    title: String,
    content: String,
    author: String,
    date: Date
  }]
    measures: [String]
  },
  images: [{ url: String, caption: String }],
  articles: [{ title: String, content: String, author: String, date: Date }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Animal', animalSchema);