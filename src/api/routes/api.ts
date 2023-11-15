import router from '../../utils/handlers/routeResourceHandler';
import userController from '../controllers/userController';

router.resource('/users', userController);

export default router;
