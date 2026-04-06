import Role from '../entities/role.entity.js';
import { QueryExecutor } from '@/shared/types/database.js';

export interface IRoleRepository {
  findOneByName: (name: string, client?: QueryExecutor) => Promise<Role>;
  findOneById: (id: string, client?: QueryExecutor) => Promise<Role>;
  findAllStaffRoles: (client?: QueryExecutor) => Promise<Role[]>;
}
