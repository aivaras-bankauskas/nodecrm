import { Request } from 'express';

interface ExtendedRequestInterface extends Request {
  user?: { _id: string };
}

export default ExtendedRequestInterface;
