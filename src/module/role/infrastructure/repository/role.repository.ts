import Role from '@/module/role/domain/entities/role.entity.js';
import { IRoleRepository } from '@/module/role/domain/interfaces/role.repository.interface.js';
import { Pool } from 'pg';
import { inject, injectable } from 'tsyringe';
import { QueryExecutor } from '@/shared/types/database.js';

@injectable()
class RoleRepository implements IRoleRepository {
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

  findAllStaffRoles = async (client?: QueryExecutor): Promise<Role[]> => {
    const exec = client || this.pool;
    const r = await exec.query("SELECT * FROM roles WHERE name != 'owner' AND deleted = false");
    return r.rows;
  };
}

export default RoleRepository;
