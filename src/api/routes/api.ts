import express from 'express';
import { index, store, show, update, destroy } from '../controllers/userController';

const router = express.Router();

router.get('/users', index);
router.post('/users', store);
router.get('/users/:id', show);
router.put('/users/:id', update);
router.delete('/users/:id', destroy);

export default router;
