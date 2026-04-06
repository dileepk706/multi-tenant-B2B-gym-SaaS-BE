export default interface IPermissionRepository {
  findOne(query: any): Promise<any>;
  findAll(): Promise<any>;
}
