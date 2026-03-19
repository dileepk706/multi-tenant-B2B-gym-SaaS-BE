type Tenant = {
  id: string;
  name: string;
  primary_gym_id: string;
  created_at: Date;
  updated_at: Date;
};

export default Tenant;

export type TenantPartial = Partial<Tenant>;
