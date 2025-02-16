import { CustomJwtPayload } from './jwt';

declare global {
  namespace Express {
    export interface Request {
      user?: CustomJwtPayload;
    }
  }
}

export {};