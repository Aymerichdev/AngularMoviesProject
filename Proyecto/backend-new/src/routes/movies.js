import { Router } from 'express';
import {getMoviesByActor, getMovies, getMovieById, createMovie, deleteMovie, updateMovie } from '../controllers/movieController.js';

const router = Router();

router.get('/', getMovies);
router.post('/', createMovie);
router.get('/:movieId', getMovieById);
router.put('/:movieId', updateMovie);
router.delete('/:movieId', deleteMovie);
router.get('/actors/:actorId', getMoviesByActor);

export default router;