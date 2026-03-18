import { injectable } from 'tsyringe';

import IGymRepositoryImpl from '@/module/gym/domain/interfaces/gym.repository.interface.js';
import GymEntity from '@/module/gym/domain/entities/gym.entity.js';
import pool from '@/database/connection.js';

@injectable()
class GymRepositoryImpl implements IGymRepositoryImpl {
  constructor() {}

  public async getGymById(id: string): Promise<GymEntity | null> {
    const result = await pool.query('SELECT * FROM gym WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as GymEntity;
  }
}

export default GymRepositoryImpl;
