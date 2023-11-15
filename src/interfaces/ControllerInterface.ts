import express from 'express';

interface ControllerInterface {
    index(req: express.Request, res: express.Response): void;
    show(req: express.Request, res: express.Response): void;
    store(req: express.Request, res: express.Response): void;
    update(req: express.Request, res: express.Response): void;
    destroy(req: express.Request, res: express.Response): void;
  }

export default ControllerInterface;
