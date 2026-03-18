import GymEntity from '@/module/gym/domain/entities/gym.entity.js';

export default interface IGymRepositoryImpl {
  getGymById: (id: string) => Promise<GymEntity | null>;
}
