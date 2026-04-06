import IPermissionRepository from '@/module/permissions/domain/interfaces/permission.repository.interface.js';
import { queryBuilder } from '@/utils/db.psql.util.js';
import { Pool } from 'pg';
import { inject, injectable } from 'tsyringe';

@injectable()
class PermissionRepository implements IPermissionRepository {
  constructor(@inject(Pool) private readonly pool: Pool) {}
  findOne = async (data: { id: string; slug: string }): Promise<any> => {
    const { query, values } = queryBuilder('permissions', data);
    const { rows } = await this.pool.query(query, values);
    return rows[0];
  };

  findAll = async (): Promise<any> => {
    const { rows } = await this.pool.query('SELECT * FROM permissions');
    return rows;
  };
}

export default PermissionRepository;
