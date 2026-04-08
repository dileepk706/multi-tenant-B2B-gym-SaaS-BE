import { StaffDto } from '@/module/staff/application/dtos/create-staff-dto.js';
import Staff from '@/module/staff/domain/entities/staff.entity.js';
import { QueryExecutor } from '@/shared/types/database.js';

interface IStaffRepository {
  create(staff: StaffDto, client?: QueryExecutor): Promise<Staff>;
  findOne(staff: Partial<Staff>, client?: QueryExecutor): Promise<Staff | null>;
  //   findByEmail: (email: string) => Promise<Staff | null>;
  //   updateById: (id: string, staff: Partial<CreateStaffDto>) => Promise<Staff | null>;
}

export default IStaffRepository;
