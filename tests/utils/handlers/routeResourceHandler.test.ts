import express from 'express';
import router from '../../../src/utils/handlers/routeResourceHandler';
import RouteResourceInterface from '../../../src/interfaces/RouteResourceInterface';
import ControllerInterface from '../../../src/interfaces/ControllerInterface';

const mockController: ControllerInterface = {
	index: jest.fn(),
	show: jest.fn(),
	store: jest.fn(),
	update: jest.fn(),
	destroy: jest.fn()
};

describe('customRoutes', () => {
	it('should define resource methods', () => {
		const route = express.Router() as RouteResourceInterface;
		router.resource('/test', mockController);
		route.get('/test', mockController.index);
		route.get('/test/:id', mockController.show);
		route.post('/test', mockController.store);
		route.put('/test/:id', mockController.update);
		route.delete('/test/:id', mockController.destroy);
	});
});
