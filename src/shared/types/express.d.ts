export type DecodedToken = {
  user_id: string;
  email: string;
  gym_id: string;
  tenant_id: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}
