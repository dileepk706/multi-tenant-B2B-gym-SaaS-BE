import { Request, Response } from 'express';

export default interface IRoleController {
  getAllStaffRoles: (req: Request, res: Response) => Promise<any>;
}
