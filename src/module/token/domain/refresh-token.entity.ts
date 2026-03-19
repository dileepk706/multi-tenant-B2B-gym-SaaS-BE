type RefreshToken = {
  id: string;
  user_id: string;
  token_hash: string;
  jti: string;
  ip: string;
  user_agent: string;
};

export default RefreshToken;
