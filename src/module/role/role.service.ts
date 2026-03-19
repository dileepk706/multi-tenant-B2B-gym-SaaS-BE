import Role from '@/module/role/role.entity.js';
import { IRoleRepositoryImpl, IRoleService } from '@/module/role/role.interface.js';
import { inject, injectable } from 'tsyringe';
import { QueryExecutor } from '@/shared/types/database.js';

@injectable()
class RoleService implements IRoleService {
  constructor(@inject('IRoleRepositoryImpl') private roleRepo: IRoleRepositoryImpl) {}

  findOneByName = async (name: string, client?: QueryExecutor): Promise<Role> => {
    const r = await this.roleRepo.findOneByName(name, client);
    return r;
  };

  findOneById = async (id: string, client?: QueryExecutor): Promise<Role> => {
    const r = await this.roleRepo.findOneById(id, client);
    return r;
  };
}

export default RoleService;
