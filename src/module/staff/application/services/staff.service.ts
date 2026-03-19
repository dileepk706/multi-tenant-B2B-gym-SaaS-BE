import { StaffDto } from '@/module/staff/application/dtos/create-staff-dto.js';
import Staff from '@/module/staff/domain/entities/staff.entity.js';
import IStaffRepository from '@/module/staff/domain/interfaces/staff.repository.interface.js';
import IStaffService from '@/module/staff/domain/interfaces/staff.service.interface.js';
import { inject, injectable } from 'tsyringe';
import { QueryExecutor } from '@/shared/types/database.js';

@injectable()
class StaffService implements IStaffService {
  constructor(@inject('IStaffRepository') private staffRepo: IStaffRepository) {}

  create = async (staff: StaffDto, client?: QueryExecutor): Promise<Staff> => {
    const result = await this.staffRepo.create(staff, client);
    return result;
  };

  findOne = async (staff: Partial<StaffDto> & { id?: string }): Promise<Staff | null> => {
    const result = await this.staffRepo.findOne(staff);
    return result;
  };
}

export default StaffService;
