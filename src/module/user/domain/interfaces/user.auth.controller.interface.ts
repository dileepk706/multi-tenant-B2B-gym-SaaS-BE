import { NextFunction, Request, Response } from 'express';

export default interface IUserAuthController {
  login(req: Request, res: Response, next: NextFunction): Promise<any>;
  logout(req: Request, res: Response, next: NextFunction): Promise<any>;
}
