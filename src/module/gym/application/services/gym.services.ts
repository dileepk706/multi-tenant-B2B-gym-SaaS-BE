import { inject, injectable } from 'tsyringe';

import { IGymService } from '@/module/gym/domain/interfaces/gym.service.interface.js';
import IGymRepositoryImpl from '@/module/gym/domain/interfaces/gym.repository.interface.js';
import GymEntity from '@/module/gym/domain/entities/gym.entity.js';

@injectable()
class GymService implements IGymService {
  constructor(
    @inject('IGymRepositoryImpl') private readonly gymRepositoryImpl: IGymRepositoryImpl,
  ) {}

  async getGymById(id: string): Promise<GymEntity | null> {
    return await this.gymRepositoryImpl.getGymById(id);
  }
}

export default GymService;
