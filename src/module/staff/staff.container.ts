import { DependencyContainer } from 'tsyringe';
import IStaffRepository from '@/module/staff/domain/interfaces/staff.repository.interface.js';
import StaffRepository from '@/module/staff/infrastructure/repository/staff.repository.js';
import IStaffService from '@/module/staff/domain/interfaces/staff.service.interface.js';
import StaffService from '@/module/staff/application/services/staff.service.js';
import StaffFcade from '@/module/staff/application/fcades/staff.fcade.js';
import StaffController from '@/module/staff/interfaces/staff.controller.js';
import IStaffController from '@/module/staff/domain/interfaces/staff.controller.interface.js';
import IStaffFcade from '@/module/staff/domain/interfaces/staff.fcade.interface.js';

export default function registerStaffModule(container: DependencyContainer) {
  container.registerSingleton<IStaffRepository>('IStaffRepository', StaffRepository);
  container.registerSingleton<IStaffService>('IStaffService', StaffService);
  container.registerSingleton<IStaffFcade>('IStaffFcade', StaffFcade);
  container.registerSingleton<IStaffController>('IStaffController', StaffController);
}
