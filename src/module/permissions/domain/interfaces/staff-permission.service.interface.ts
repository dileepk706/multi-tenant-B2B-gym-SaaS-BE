export default interface IStaffPermissionService {
  create({ permission_id, staff_id }: { permission_id: string; staff_id: string }): Promise<any>;
  delete({ permission_id, staff_id }: { permission_id: string; staff_id: string }): Promise<any>;
  getAllStaffPermissions(data: { permission_id?: string; staff_id?: string }): Promise<any>;
  getAllPermissions(): Promise<any>;
}
