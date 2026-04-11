import { CreateWorkspaceDto } from '@/module/onboarding/application/dtos/create-workspace.dto.js';

interface IOnboardingFcade {
  createWorkspaceAndOnboardOwner(
    createWorkspaceDto: CreateWorkspaceDto,
    userId: string,
  ): Promise<any>;
  checkGymUrl(url: string): Promise<boolean>;
}

export default IOnboardingFcade;
