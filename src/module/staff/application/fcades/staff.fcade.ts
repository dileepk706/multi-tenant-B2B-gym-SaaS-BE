import { inject, injectable } from 'tsyringe';
import IStaffService from '@/module/staff/domain/interfaces/staff.service.interface.js';
import { StaffDto } from '@/module/staff/application/dtos/create-staff-dto.js';
import IStaffFcade from '@/module/staff/domain/interfaces/staff.fcade.interface.js';
import { ApiError } from '@/shared/middleware/error_handler.js';
import httpStatus from 'http-status';
import IStaffPermissionService from '@/module/permissions/domain/interfaces/staff-permission.service.interface.js';
import { IRoleService } from '@/module/role/domain/interfaces/role.service.interface.js';

@injectable()
class StaffFcade implements IStaffFcade {
  constructor(
    @inject('IStaffService') private readonly staffService: IStaffService,
    @inject('IStaffPermissionService')
    private readonly staffPermissionService: IStaffPermissionService,
    @inject('IRoleService') private readonly roleService: IRoleService,
  ) {}

  createStaffUser = async (staff: StaffDto & { permissions: string[] }): Promise<any> => {
    // remove user_id fk frim rrefresh token
    const role = await this.roleService.findOneById(staff.role_id);
    if (!role) throw new ApiError('Role not found', httpStatus.NOT_FOUND);

    const newStaff = await this.staffService.create(staff);

    await Promise.all(
      staff.permissions.map(async (permission_id) => {
        await this.staffPermissionService.create({
          permission_id,
          staff_id: newStaff.id,
        });
      }),
    );

    const staffPermissions = await this.staffPermissionService.getAllStaffPermissions({
      staff_id: newStaff.id,
    });

    return { ...newStaff, permissions: staffPermissions };
  };
}

export default StaffFcade;
