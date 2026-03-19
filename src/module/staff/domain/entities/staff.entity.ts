type Staff = {
  id: string;
  tenant_id: string;
  gym_id: string;
  user_id: string;
  role_id: string;
  name: string;
  email: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
  created_on: number;
  updated_on: number;
};

export default Staff;

export type StaffPartial = Partial<Staff>;
