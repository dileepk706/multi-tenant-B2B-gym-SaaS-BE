import { inject, injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
//
import env from '@/config/environment.js';
import RefreshTokenRepository from '@/module/token/infra/repo/refresh-tokens.repo.js';
import CreateRefreshTokenDto from '@/module/token/application/dtos/create-token-dtos.js';
import TokenSharedService, {
  createJti,
  hashToken,
} from '@/shared/services/token.shared.service.js';
import { ApiError } from '@/shared/middleware/error_handler.js';
import RefreshTokenEntity from '@/module/token/domain/refresh-token.entity.js';

@injectable()
class TokenService {
  constructor(
    @inject('IRefreshTokenRepository')
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  createRefreshToken = async (data: CreateRefreshTokenDto) => {
    const token_hash = hashToken(data.refreshToken);
    const expires_at = new Date(Date.now() + env.REFRESH_TTL_SEC * 1000);

    await this.refreshTokenRepository.create({
      token_hash,
      expires_at,
      jti: data.jti,
      user_id: data.user_id,
      ip: data.ip,
      user_agent: data.user_agent,
    });
  };

  generateAuthTokens = async (
    payLoad: any,
    reqContext: { ip: string; user_agent: string },
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    const tss = new TokenSharedService(payLoad);
    const accessToken = await tss.signAccessToken();
    const jti = createJti();
    const refreshToken = await tss.signRefreshToken(jti);

    await this.createRefreshToken({
      refreshToken,
      user_id: payLoad.id,
      ip: reqContext.ip,
      user_agent: reqContext.user_agent,
      jti,
    });

    return { accessToken, refreshToken };
  };

  rotateRefreshToken = async (
    id: string,
    payLoad: Omit<CreateRefreshTokenDto, 'refreshToken' | 'jti'>,
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    await this.deleteRefreshTokenByTokenHash(id);

    const { accessToken, refreshToken } = await this.generateAuthTokens(payLoad, {
      ip: payLoad.ip,
      user_agent: payLoad.user_agent,
    });

    return { accessToken, refreshToken };
  };

  findRefreshTokenByTokenHashAndJti = async (tokenHash: string, jti: string) => {
    return this.refreshTokenRepository.findByTokenHashAndJti(tokenHash, jti);
  };

  findRefreshTokenByTokenHash = async (tokenHash: string) => {
    return this.refreshTokenRepository.findByTokenHash(tokenHash);
  };

  updateRefreshToken = async (id: string, data: any) => {
    return this.refreshTokenRepository.update(id, data);
  };

  deleteRefreshTokenByTokenHash = async (tokenHash: string) => {
    return this.refreshTokenRepository.deleteByTokenHash(tokenHash);
  };

  verifyRefreshToken = async (token: string): Promise<RefreshTokenEntity> => {
    let decoded: any;
    const tokenHash = hashToken(token);

    try {
      decoded = jwt.verify(token, env.REFRESH_SECRET);
    } catch {
      await this.deleteRefreshTokenByTokenHash(tokenHash);
      throw new ApiError('Invalid or expired refresh token', 401);
    }

    const doc = await this.findRefreshTokenByTokenHashAndJti(tokenHash, decoded.jti);

    if (!doc) {
      throw new ApiError('Refresh token not recognized', 401);
    }

    return doc;
  };
}

export default TokenService;
