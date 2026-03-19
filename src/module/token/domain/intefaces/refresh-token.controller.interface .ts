import { Request, Response } from 'express';

interface IRefreshTokenController {
  refreshToken: (req: Request, res: Response) => Promise<any>;
}

export default IRefreshTokenController;
