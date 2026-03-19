import { DependencyContainer } from 'tsyringe';
import IStaffRepository from '@/module/staff/domain/interfaces/staff.repository.interface.js';
import StaffRepository from '@/module/staff/infrastructure/repository/staff.repository.js';
import IStaffService from '@/module/staff/domain/interfaces/staff.service.interface.js';
import StaffService from '@/module/staff/application/services/staff.service.js';

export default function registerStaffModule(container: DependencyContainer) {
  container.registerSingleton<IStaffRepository>('IStaffRepository', StaffRepository);
  container.registerSingleton<IStaffService>('IStaffService', StaffService);
}
