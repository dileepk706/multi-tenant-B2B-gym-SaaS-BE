import { StaffDto } from '@/module/staff/application/dtos/create-staff-dto.js';
import Staff from '@/module/staff/domain/entities/staff.entity.js';
import IStaffRepository from '@/module/staff/domain/interfaces/staff.repository.interface.js';
import { Pool } from 'pg';
import { inject, injectable } from 'tsyringe';
import { QueryExecutor } from '@/shared/types/database.js';

@injectable()
class StaffRepository implements IStaffRepository {
  constructor(@inject(Pool) private readonly pool: Pool) {}

  create = async (staff: StaffDto, client?: QueryExecutor): Promise<Staff> => {
    const exec = client || this.pool;
    const result = await exec.query(
      'INSERT INTO staff(name,email,phone,tenant_id,gym_id ,user_id,role_id)  VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [
        staff.name,
        staff.email,
        staff.phone,
        staff.tenant_id,
        staff.gym_id,
        staff.user_id,
        staff.role_id,
      ],
    );

    return result.rows[0];
  };

  findOne = async (staff: Partial<Staff>): Promise<Staff | null> => {
    const keys = Object.keys(staff);
    if (keys.length === 0) return null;

    const values = Object.values(staff);
    const fields = keys.map((key, index) => `"${key}" = $${index + 1}`).join(' AND ');

    const query = `SELECT * FROM staff WHERE ${fields}`;

    const result = await this.pool.query(query, values);

    return result.rows[0] || null;
  };
}

export default StaffRepository;
