import Role from '../entities/role.entity.js';
import { QueryExecutor } from '@/shared/types/database.js';

export interface IRoleService {
  findOneByName: (name: string, client?: QueryExecutor) => Promise<Role>;
  findOneById: (id: string, client?: QueryExecutor) => Promise<Role>;
  getAllStaffRoles: (client?: QueryExecutor) => Promise<Role[]>;
}
