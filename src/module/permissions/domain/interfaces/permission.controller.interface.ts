import { NextFunction, Request, Response } from 'express';

export default interface IPermissionController {
  getAllPermissions(req: Request, res: Response, next: NextFunction): Promise<any>;
}
