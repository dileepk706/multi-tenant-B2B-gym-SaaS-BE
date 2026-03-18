type CreateRefreshTokenDto = {
  user_id: string;
  ip: string;
  user_agent: string;
  refreshToken: string;
  jti: string;
};

export default CreateRefreshTokenDto;
