import Role from '@/module/role/role.entity.js';
import { IRoleRepositoryImpl } from '@/module/role/role.interface.js';
import { Pool } from 'pg';
import { inject, injectable } from 'tsyringe';
import { QueryExecutor } from '@/shared/types/database.js';

@injectable()
class RoleRepositoryImpl implements IRoleRepositoryImpl {
  constructor(@inject(Pool) private readonly pool: Pool) {}

  findOneByName = async (name: string, client?: QueryExecutor): Promise<Role> => {
    const exec = client || this.pool;
    const r = await exec.query('SELECT * FROM roles WHERE name=$1', [name]);
    return r.rows[0];
  };

  findOneById = async (id: string, client?: QueryExecutor): Promise<Role> => {
    const exec = client || this.pool;
    const r = await exec.query('SELECT * FROM roles WHERE id=$1', [id]);
    return r.rows[0];
  };
}

export default RoleRepositoryImpl;
