import router from '../../utils/handlers/routeResourceHandler';
import userController from '../controllers/userController';
import loginController from '../controllers/authentication/loginController';
import registrationController from '../controllers/authentication/registrationController';

router.post('/login', loginController.login);
router.post('/register', registrationController.register);

router.get('/users', userController.index);
router.get('/users/:id', userController.show);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.destroy);

export default router;
