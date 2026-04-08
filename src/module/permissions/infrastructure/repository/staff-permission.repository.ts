import IStaffPermissionRepository from '@/module/permissions/domain/interfaces/staff-permission.repository.interface.js';
import { queryBuilder, insertQueryBuilder } from '@/utils/db.psql.util.js';
import { Pool } from 'pg';
import { inject, injectable } from 'tsyringe';

@injectable()
class StaffPermissionRepository implements IStaffPermissionRepository {
  constructor(@inject(Pool) private readonly pool: Pool) {}

  create = async (data: { permission_id: string; staff_id: string }): Promise<any> => {
    const { query, values } = insertQueryBuilder('staff_permissions', data);
    const { rows } = await this.pool.query(query, values);
    return rows[0];
  };

  delete = async (data: { permission_id: string; staff_id: string }): Promise<any> => {
    const { query, values } = queryBuilder('staff_permissions', data);
    const deleteQuery = query.replace('SELECT *', 'DELETE') + ' RETURNING *';
    const { rows } = await this.pool.query(deleteQuery, values);
    return rows[0];
  };

  findAll = async ({
    permission_id,
    staff_id,
  }: {
    permission_id?: string;
    staff_id?: string;
  }): Promise<any> => {
    const { query, values } = queryBuilder('staff_permissions', { permission_id, staff_id });
    const { rows } = await this.pool.query(query, values);
    return rows;
  };
}

export default StaffPermissionRepository;
