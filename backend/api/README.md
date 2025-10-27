# Animal Diversity API

A RESTful API for managing animal data with MongoDB backend.

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Get All Animals
```http
GET /api/animals
```

**Query Parameters:**
- `search` (optional): Search by common name, scientific name, or description
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 25,
  "pagination": {
    "page": 1,
    "limit": 10,
    "pages": 3
  },
  "data": [...]
}
```

#### 2. Get Single Animal
```http
GET /api/animals/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "commonName": "African Lion",
    "scientificName": "Panthera leo",
    ...
  }
}
```

#### 3. Create Animal
```http
POST /api/animals
Content-Type: application/json
```

**Request Body:**
```json
{
  "commonName": "African Lion",
  "scientificName": "Panthera leo",
  "description": "...",
  "habitat": ["Savanna", "Grassland"],
  "diet": "Carnivore",
  "images": [
    {
      "url": "https://...",
      "caption": "..."
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Animal created successfully",
  "data": {...}
}
```

#### 4. Update Animal
```http
PATCH /api/animals/:id
Content-Type: application/json
```

**Request Body:** (any fields to update)
```json
{
  "commonName": "Updated Name",
  "description": "Updated description"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Animal updated successfully",
  "data": {...}
}
```

#### 5. Delete Animal
```http
DELETE /api/animals/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Animal deleted successfully",
  "data": {...}
}
```

## Data Model

### Animal Schema
```javascript
{
  commonName: String (required),
  scientificName: String,
  description: String,
  habitat: [String],
  diet: String,
  images: [{
    url: String (required),
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
  }],
  timestamps: true
}
```

## Error Handling

All errors return in this format:
```json
{
  "success": false,
  "error": "Error description",
  "message": "Detailed error message"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## Examples

### Search Animals
```bash
curl "http://localhost:5000/api/animals?search=lion"
```

### Get with Pagination
```bash
curl "http://localhost:5000/api/animals?page=2&limit=5"
```

### Create Animal
```bash
curl -X POST http://localhost:5000/api/animals \
  -H "Content-Type: application/json" \
  -d '{"commonName":"Test Animal","scientificName":"Testus animalus"}'
```

### Update Animal
```bash
curl -X PATCH http://localhost:5000/api/animals/[ID] \
  -H "Content-Type: application/json" \
  -d '{"commonName":"Updated Name"}'
```

### Delete Animal
```bash
curl -X DELETE http://localhost:5000/api/animals/[ID]
```

## Directory Structure
```
backend/api/
├── config/
│   └── database.js      # Database configuration
├── controllers/
│   └── animalController.js  # Business logic
├── models/
│   └── Animal.js        # Mongoose schema
└── routes/
    └── animals.js       # Route definitions
```

## Integration

The existing backend (`server.js`) can use this API structure by importing:

```javascript
const animalRoutes = require('./api/routes/animals');
app.use('/api/animals', animalRoutes);
```

Or use the controllers directly:
```javascript
const animalController = require('./api/controllers/animalController');
```
