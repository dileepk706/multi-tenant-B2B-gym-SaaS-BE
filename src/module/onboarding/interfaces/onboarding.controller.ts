import IOnboardingController from '@/module/onboarding/domain/onboarding.controller.interface.js';
import IOnboardingFcade from '@/module/onboarding/domain/onboarding.fcade.interface.js';
import { ApiError } from '@/shared/middleware/error_handler.js';
import { responseHandler } from '@/shared/response_handler.js';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
class OnboardingController implements IOnboardingController {
  constructor(@inject('IOnboardingFcade') private readonly onboardingFcade: IOnboardingFcade) {}

  createWorkspaceAndOnboardOwner = async (req: Request, res: Response): Promise<any> => {
    const tenant_id = req.user?.tenant_id;

    if (tenant_id) throw new ApiError('You are already onboarded', 400);

    const result = await this.onboardingFcade.createWorkspaceAndOnboardOwner({
      ...req.body,
      user_id: req.user?.user_id,
    });

    return responseHandler(res, result, 'Onboarded successfully', 200);
  };
}

export default OnboardingController;
