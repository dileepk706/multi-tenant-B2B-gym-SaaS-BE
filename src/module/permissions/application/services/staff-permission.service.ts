import IPermissionRepository from '@/module/permissions/domain/interfaces/permission.repository.interface.js';
import IStaffPermissionRepository from '@/module/permissions/domain/interfaces/staff-permission.repository.interface.js';
import IStaffPermissionService from '@/module/permissions/domain/interfaces/staff-permission.service.interface.js';
import { ApiError } from '@/shared/middleware/error_handler.js';
import httpStatus from 'http-status';
import { inject, injectable } from 'tsyringe';

@injectable()
class StaffPermissionService implements IStaffPermissionService {
  constructor(
    @inject('IStaffPermissionRepository')
    private readonly staffPermissionRepository: IStaffPermissionRepository,
    @inject('IPermissionRepository') private readonly permissionRepository: IPermissionRepository,
  ) {}

  create = async (data: { permission_id: string; staff_id: string }): Promise<any> => {
    const permission = await this.permissionRepository.findOne({ id: data.permission_id });
    if (!permission) throw new ApiError('Permission not found', httpStatus.NOT_FOUND);
    return await this.staffPermissionRepository.create(data);
  };

  delete = async (data: { permission_id: string; staff_id: string }): Promise<any> => {
    const permission = await this.permissionRepository.findOne({ id: data.permission_id });
    if (!permission) throw new ApiError('Permission not found', httpStatus.NOT_FOUND);
    return this.staffPermissionRepository.delete(data);
  };

  getAllStaffPermissions = async (data: {
    permission_id?: string;
    staff_id?: string;
  }): Promise<any> => {
    return this.staffPermissionRepository.findAll(data);
  };

  getAllPermissions = async (): Promise<any> => {
    return this.permissionRepository.findAll();
  };
}

export default StaffPermissionService;
