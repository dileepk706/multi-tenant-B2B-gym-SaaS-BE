export default interface IStaffPermissionRepository {
  create(data: any): Promise<any>;
  delete(data: any): Promise<any>;
  findAll(data: { permission_id?: string; staff_id?: string }): Promise<any>;
}
