import { CreateGymDto } from '@/module/gym/application/dtos/create-gym.dtos.js';

interface IOnboardingFcade {
  createWorkspaceAndOnboardOwner(data: CreateGymDto & { user_id: string }): Promise<any>;
}

export default IOnboardingFcade;
