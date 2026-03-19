import RoleRepositoryImpl from '@/module/role/role.repository.js';
import RoleService from '@/module/role/role.service.js';
import { DependencyContainer } from 'tsyringe';

export default function registerRoleModule(container: DependencyContainer) {
  container.registerSingleton('IRoleRepositoryImpl', RoleRepositoryImpl);
  container.registerSingleton('IRoleService', RoleService);
}
