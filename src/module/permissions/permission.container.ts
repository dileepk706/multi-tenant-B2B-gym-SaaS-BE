import PermissionRepository from '@/module/permissions/infrastructure/repository/permission.repository.js';
import StaffPermissionRepository from '@/module/permissions/infrastructure/repository/staff-permission.repository.js';
import StaffPermissionService from '@/module/permissions/application/services/staff-permission.service.js';
import PermissionController from '@/module/permissions/interfaces/controller/permission.controller.js';
import { DependencyContainer } from 'tsyringe';

export default function registerPermissionModule(container: DependencyContainer) {
  container.registerSingleton('IStaffPermissionRepository', StaffPermissionRepository);
  container.registerSingleton('IStaffPermissionService', StaffPermissionService);
  container.registerSingleton('IPermissionRepository', PermissionRepository);
  container.registerSingleton('IPermissionController', PermissionController);
}
