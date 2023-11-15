import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/users', userController.index);
router.post('/users', userController.store);
router.get('/users/:id', userController.show);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.destroy);

export default router;
