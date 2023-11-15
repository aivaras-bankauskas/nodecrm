import express from 'express';
import ControllerInterface from './ControllerInterface';

interface RouteResourceInterface extends express.Router {
    resource: (path: string, controller: ControllerInterface) => void;
}

export default RouteResourceInterface;
