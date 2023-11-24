import { loginLimiter, registerLimiter } from '../../config/rateLimits';
import router from '../../utils/handlers/routeResourceHandler';
import authMiddleware from '../middleware/authMiddleware';
import userController from '../controllers/userController';
import loginController from '../controllers/authentication/loginController';
import registrationController from '../controllers/authentication/registrationController';

router.post('/login', loginLimiter, loginController.login);
router.post('/register', registerLimiter, registrationController.register);

router.get('/auth-user', authMiddleware, userController.auth);
router.get('/users', authMiddleware, userController.index);
router.get('/users/:id', authMiddleware, userController.show);
router.put('/users/:id', authMiddleware, userController.update);
router.delete('/users/:id', authMiddleware, userController.destroy);

export default router;
