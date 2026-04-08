import IPermissionController from '@/module/permissions/domain/interfaces/permission.controller.interface.js';
import IStaffPermissionService from '@/module/permissions/domain/interfaces/staff-permission.service.interface.js';
import { sendSuccess } from '@/shared/response_handler.js';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
class PermissionController implements IPermissionController {
  constructor(
    @inject('IStaffPermissionService')
    private readonly staffPermissionService: IStaffPermissionService,
  ) {}

  getAllPermissions = async (req: Request, res: Response) => {
    const result = await this.staffPermissionService.getAllPermissions();
    return sendSuccess(res, result, 'Permissions fetched successfully', 200);
  };

  getAllStaffPermissions = async (req: Request, res: Response) => {
    const result = await this.staffPermissionService.getAllStaffPermissions(req.query);
    return sendSuccess(res, result, 'Staff permissions fetched successfully', 200);
  };
}

export default PermissionController;
