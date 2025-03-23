import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'], // Validación de campo requerido
    minlength: [3, 'Title must be at least 3 characters long'] // Validación de longitud mínima
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'],
  },
  genre: { 
    type: String, 
    required: [true, 'Genre is required'],
  },
  releaseDate: { 
    type: Date, 
    required: [true, 'Release Date is required'],
  },
  clasification: { 
    type: String, 
    enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'], // Validación de un conjunto específico de valores
    required: [true, 'Clasification is required'],
  },
  actorIds: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Actor',
    required: [true, 'Actorid list is required'],
  }],
  imgLinks: [{ type: String, }]
});

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;