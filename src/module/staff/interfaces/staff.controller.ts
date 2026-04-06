import { StaffDto } from '@/module/staff/application/dtos/create-staff-dto.js';
import IStaffController from '@/module/staff/domain/interfaces/staff.controller.interface.js';
import IStaffFcade from '@/module/staff/domain/interfaces/staff.fcade.interface.js';
import IStaffService from '@/module/staff/domain/interfaces/staff.service.interface.js';
import { sendSuccess } from '@/shared/response_handler.js';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

@injectable()
class StaffController implements IStaffController {
  constructor(
    @inject('IStaffService') private readonly staffService: IStaffService,
    @inject('IStaffFcade') private readonly staffFcade: IStaffFcade,
  ) {}

  createStaffUser = async (req: Request, res: Response): Promise<any> => {
    const s: StaffDto = {
      ...req.body,
      gym_id: req.user.gym_id,
      tenant_id: req.user.tenant_id,
    };

    let result;
    if (req.body.send_invitation && req.body.email) {
      z.email({ message: 'Invalid email address' }).parse(req.body.email);
      result = await this.staffFcade.createStaffUser(s);
    } else {
      result = await this.staffFcade.createStaffUser(s);

      // result = await this.staffService.create(s);
    }

    // if staff deletes permisions also delated
    // if any permision deleted , delete the record from staff table

    return sendSuccess(res, { result }, 'Staff created successfully', 201);
  };
}

export default StaffController;
