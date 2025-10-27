const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const animalRoutes = require('./routes/animals');
const Animal = require('./models/AnimalModel');
app.use('/api/animals', animalRoutes);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/animal_diversity';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));