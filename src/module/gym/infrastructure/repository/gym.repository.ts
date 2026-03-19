import { inject, injectable } from 'tsyringe';
import { Pool } from 'pg';
//
import Gym, { GymPartial } from '@/module/gym/domain/entities/gym.entity.js';
import IGymRepositoryImpl from '@/module/gym/domain/interfaces/gym.repository.interface.js';
import { QueryExecutor } from '@/shared/types/database.js';

@injectable()
class GymRepositoryImpl implements IGymRepositoryImpl {
  constructor(@inject(Pool) private readonly pool: Pool) {}

  public async findById(id: string, client?: QueryExecutor): Promise<Gym | null> {
    const exec = client || this.pool;
    const result = await exec.query('SELECT * FROM gyms WHERE id = $1 AND deleted = false', [id]);
    return result.rows[0] as Gym;
  }

  create = async (gym: GymPartial, client?: QueryExecutor) => {
    const exec = client || this.pool;
    const result = await exec.query(
      'INSERT INTO gyms (tenant_id,name,email,city,state,phone,address,logo_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
      [
        gym.tenant_id,
        gym.name,
        gym.email,
        gym.city,
        gym.state,
        gym.phone,
        gym.address,
        gym.logo_url,
      ],
    );
    return result.rows[0] as Gym;
  };

  updateById = async (id: string, updates: GymPartial, client?: QueryExecutor): Promise<Gym | null> => {
    const keys = Object.keys(updates);

    if (keys.length === 0) return null;

    const setFields = keys.map((key, index) => `"${key}" = $${index + 2}`).join(', ');
    const values = Object.values(updates);

    const query = `UPDATE gyms SET ${setFields} WHERE id = $1 RETURNING *`;

    const exec = client || this.pool;
    const result = await exec.query(query, [id, ...values]);

    return result.rows[0] as Gym;
  };
}

export default GymRepositoryImpl;
