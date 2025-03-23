import { Router } from 'express';
import { getActors, createActor, updateActor, deleteActor, getActorById } from '../controllers/actorController.js';

const router = Router();

router.get('/', getActors);
router.get('/:id', getActorById);
router.post('/', createActor);
router.put('/:id', updateActor);
router.delete('/:id', deleteActor);

export default router;
