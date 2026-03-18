import RefreshTokenEntity from '@/module/token/domain/refresh-token.entity.js';

interface IRefreshTokenService {
  createRefreshToken: (data: CreateRefreshTokenDto) => Promise<void>;

  rotateRefreshToken: (
    id: string,
    data: CreateRefreshTokenDto,
  ) => Promise<{ accessToken: string; refreshToken: string }>;

  findRefreshTokenByTokenHashAndJti: (
    tokenHash: string,
    jti: string,
  ) => Promise<RefreshTokenEntity>;

  deleteRefreshTokenById: (id: string) => Promise<RefreshTokenEntity>;
}

type CreateRefreshTokenDto = {
  user_id: string;
  ip: string;
  user_agent: string;
  refreshToken: string;
  jti: string;
};

export default IRefreshTokenService;
