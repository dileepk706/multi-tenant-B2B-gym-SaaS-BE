export type GymStatus = 'trial' | 'active' | 'suspended';

type GymEntity = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  logo_url: string | null;
  status: GymStatus;
  trial_ends_at: Date | null;
  subscription_plan_id: string | null;
  created_at: Date;
  updated_at: Date;
};

export default GymEntity;
