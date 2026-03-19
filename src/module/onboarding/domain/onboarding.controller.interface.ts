import { Request, Response } from 'express';

interface IOnboardingController {
  createWorkspaceAndOnboardOwner(req: Request, res: Response): Promise<any>;
}

export default IOnboardingController;
