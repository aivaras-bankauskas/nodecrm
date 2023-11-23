import express from 'express';
import RouteResourceInterface from '../../interfaces/RouteResourceInterface';
import ControllerInterface from '../../interfaces/ControllerInterface';

const customRoutes = (): RouteResourceInterface => {
	const route = express.Router() as RouteResourceInterface;

	route.resource = (path: string, controller: ControllerInterface): void => {
		route.get(`${path}`, controller.index);
		route.get(`${path}/:id`, controller.show);
		route.post(`${path}`, controller.store);
		route.put(`${path}/:id`, controller.update);
		route.delete(`${path}/:id`, controller.destroy);
	};

	return route;
};

const router = customRoutes();

export default router;
