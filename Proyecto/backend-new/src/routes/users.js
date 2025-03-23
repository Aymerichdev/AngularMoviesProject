import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
} from '../controllers/userController.js';

const router = express.Router();

// CRUD operations for users
router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/login', login);
router.post('/', createUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;