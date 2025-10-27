const mongoose = require('mongoose');
const Animal = require('./models/AnimalModel');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/animal_diversity';

const sampleAnimals = [
{
    commonName: 'African Lion',
    scientificName: 'Panthera leo',
    description: 'Lions are large social cats living in prides. Males are recognized by their manes and both sexes are powerful predators in African ecosystems.',
    habitat: ['Savanna', 'Grassland', 'Open woodland'],
    diet: 'Carnivore',
    images: [
      { 
        url: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1200',
        caption: 'Majestic male lion with full mane'
      },
      {
        url: 'https://images.unsplash.com/photo-1534628526458-a8de087b1123?q=80&w=1200',
        caption: 'Lion pride resting in savanna'
      }
    ]
  },
  {
    commonName: 'Emperor Penguin',
    scientificName: 'Aptenodytes forsteri',
    description: 'The Emperor Penguin is the largest penguin species and breeds during the Antarctic winter; males incubate eggs on their feet.',
    habitat: ['Antarctic coast', 'Pack ice'],
    diet: 'Fish, krill, squid',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?q=80&w=1200',
        caption: 'Emperor penguins in Antarctica'
      },
      {
        url: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?q=80&w=1200',
        caption: 'Emperor penguin with chick'
      }
    ]
  },
  {
    commonName: 'Blue Morpho Butterfly',
    scientificName: 'Morpho peleides',
    description: 'The Blue Morpho has brilliant iridescent blue wings used for signaling and camouflage against predators.',
    habitat: ['Tropical rainforest', 'Canopy'],
    diet: 'Nectar, fermenting fruit',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1551197600-d3676f51c4f7?q=80&w=1200',
        caption: 'Blue Morpho butterfly showing iridescent wings'
      },
      {
        url: 'https://images.unsplash.com/photo-1469116809181-1d9c4a5b87cf?q=80&w=1200',
        caption: 'Blue Morpho butterfly perched on leaf'
      }
    ]
  },
  {
    commonName: 'Giant Pacific Octopus',
    scientificName: 'Enteroctopus dofleini',
    description: 'A highly intelligent cephalopod known for problem solving and camouflage; can grow very large with long arms.',
    habitat: ['Coastal North Pacific', 'Rocky reefs'],
    diet: 'Crustaceans, fish, mollusks',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?q=80&w=1200',
        caption: 'Giant Pacific Octopus displaying tentacles'
      },
      {
        url: 'https://images.unsplash.com/photo-1541956064527-8ec10bd6b953?q=80&w=1200',
        caption: 'Octopus changing color for camouflage'
      }
    ]
  },
  {
    commonName: 'Green Sea Turtle',
    scientificName: 'Chelonia mydas',
    classification: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Reptilia', order: 'Testudines', family: 'Cheloniidae', genus: 'Chelonia', species: 'mydas' },
    habitat: ['Tropical and subtropical seas','Coral reefs','Seagrass beds'],
    diet: 'Herbivore (seagrasses, algae)',
    description: 'A migratory sea turtle species that plays a key role in coastal ecosystems by grazing on seagrass beds.',
    conservation: { status: 'Endangered', threats: ['Bycatch','Habitat loss','Pollution'], measures: ['Protected nesting sites','Bycatch reduction'] },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=1200',
        caption: 'Green sea turtle swimming in clear blue water'
      },
      {
        url: 'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?q=80&w=1200',
        caption: 'Green sea turtle near coral reef'
      }
    ],
    articles: [{ title: 'Sea Turtle Migrations', content: 'Green sea turtles migrate long distances between foraging grounds and nesting beaches.', author: 'Dr. Ocean', date: new Date('2021-09-12') }]
  }
];

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB for seeding');
    await Animal.deleteMany({});
    await Animal.insertMany(sampleAnimals);
    console.log('Seed complete');
    process.exit(0);
  })
  .catch(err => { console.error(err); process.exit(1); });