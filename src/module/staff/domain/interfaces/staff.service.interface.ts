import { StaffDto } from '@/module/staff/application/dtos/create-staff-dto.js';
import Staff from '@/module/staff/domain/entities/staff.entity.js';
import { QueryExecutor } from '@/shared/types/database.js';

interface IStaffService {
  create(staff: StaffDto, client?: QueryExecutor): Promise<Staff>;
  findOne(staff: Partial<StaffDto> & { id?: string }): Promise<Staff | null>;
}

export default IStaffService;
