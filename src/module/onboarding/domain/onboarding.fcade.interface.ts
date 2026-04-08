import { CreateGymDto } from '@/module/gym/application/dtos/create-gym.dtos.js';

interface IOnboardingFcade {
  createWorkspaceAndOnboardOwner(createGymDto: CreateGymDto, userId: string): Promise<any>;
  checkGymUrl(url: string): Promise<boolean>;
}

export default IOnboardingFcade;
