import Movie from '../models/Movie.js';

// Get all movies
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error getting movies' });
  }
};

// Get a movie by ID
const getMovieById = async (req, res) => {
  try {
    const { movieId } = req.params; // Get the movie's ID from the URL

    const movie = await Movie.findById(movieId).populate('actorIds'); // Fetch the movie and populate actor details if needed

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching the movie' });
  }
};

// Create a movie
const createMovie = async (req, res) => {
  try {
    const { title, description, genre, releaseDate, clasification, actorIds, imgLinks } = req.body;

    const newMovie = new Movie({
      title,
      description,
      genre,
      releaseDate,
      clasification,
      actorIds,
      imgLinks,
    });

    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ error: 'Error creating movie ' + error.message });
  }
};

// Delete movie by ID
const deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params; // Get the movie's ID from the URL

    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the movie' });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const updateData = req.body;

    // Find and update the movie
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Update only the fields passed in the request body
    Object.keys(updateData).forEach((key) => {
      movie[key] = updateData[key];
    });

    // Validation before saving
    await movie.validate(); // This ensures the data complies with the validation rules defined in the schema

    await movie.save();
    res.status(200).json(movie);
  } catch (error) {
    // If validation fails, Mongoose throws an error with the details
    res.status(400).json({ error: error.message });
  }
};

const getMoviesByActor = async (req, res) => {
  try {
    const { actorId } = req.params; // Extract actorId from URL

    // Validate that actorId exists and is a valid string
    if (!actorId || typeof actorId !== 'string') {
      return res.status(400).json({ error: 'Invalid actor ID format' });
    }

    // Query movies where actorId is inside the 'actors' array
    const movies = await Movie.find({ actorIds: { $in: [actorId] } });
  
    if (movies.length === 0) {
      return res.status(404).json({ error: 'No movies found for this actor' });
    }

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching movies for actor' });
  }
};


export { getMoviesByActor, getMovies, getMovieById, createMovie, deleteMovie, updateMovie };