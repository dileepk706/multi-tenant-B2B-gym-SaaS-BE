import GymEntity from '@/module/gym/domain/entities/gym.entity.js';

export interface IGymService {
  getGymById(id: string): Promise<GymEntity | null>;
}
