import Role from '@/module/role/role.entity.js';
import { QueryExecutor } from '@/shared/types/database.js';

export interface IRoleService {
  findOneByName: (name: string, client?: QueryExecutor) => Promise<Role>;
  findOneById: (id: string, client?: QueryExecutor) => Promise<Role>;
}

export interface IRoleRepositoryImpl {
  findOneByName: (name: string, client?: QueryExecutor) => Promise<Role>;
  findOneById: (id: string, client?: QueryExecutor) => Promise<Role>;
}
