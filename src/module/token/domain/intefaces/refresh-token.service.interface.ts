import RefreshToken from '@/module/token/domain/refresh-token.entity.js';

interface IRefreshTokenService {
  createRefreshToken: (data: CreateRefreshTokenDto) => Promise<void>;

  rotateRefreshToken: (
    id: string,
    payLoad: any,
  ) => Promise<{
    accessToken: string;
    refreshToken: string;
  }>;

  findRefreshTokenByTokenHashAndJti: (tokenHash: string, jti: string) => Promise<RefreshToken>;

  verifyRefreshToken: (token: string) => Promise<{ doc: RefreshToken; decoded: any }>;
}

type CreateRefreshTokenDto = {
  user_id: string;
  ip: string;
  user_agent: string;
  refreshToken: string;
  jti: string;
};

export default IRefreshTokenService;
