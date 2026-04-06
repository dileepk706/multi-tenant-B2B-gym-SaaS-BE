import Role from '@/module/role/domain/entities/role.entity.js';
import { IRoleService } from '@/module/role/domain/interfaces/role.service.interface.js';
import { IRoleRepository } from '@/module/role/domain/interfaces/role.repository.interface.js';
import { inject, injectable } from 'tsyringe';
import { QueryExecutor } from '@/shared/types/database.js';

@injectable()
class RoleService implements IRoleService {
  constructor(@inject('IRoleRepository') private readonly roleRepository: IRoleRepository) {}

  findOneByName = async (name: string, client?: QueryExecutor): Promise<Role> => {
    return this.roleRepository.findOneByName(name, client);
  };

  findOneById = async (id: string, client?: QueryExecutor): Promise<Role> => {
    return this.roleRepository.findOneById(id, client);
  };

  getAllStaffRoles = async (client?: QueryExecutor): Promise<Role[]> => {
    return this.roleRepository.findAllStaffRoles(client);
  };
}

export default RoleService;
