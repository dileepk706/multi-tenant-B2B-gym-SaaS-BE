export type DecodedToken = {
  user_id?: string | null;
  staff_id?: string | null;
  member_id?: string | null;
  email?: string | null;
  gym_id?: string | null;
  tenant_id?: string | null;
  role?: 'admin' | 'staff' | 'member' | null;
};

declare global {
  namespace Express {
    interface Request {
      user: DecodedToken;
    }
  }
}
