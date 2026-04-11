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
import RefreshToken from '@/module/token/domain/refresh-token.entity.js';
import IRefreshTokenService from '@/module/token/domain/intefaces/refresh-token.service.interface.js';
import httpStatus from 'http-status';

@injectable()
class TokenService implements IRefreshTokenService {
  constructor(
    @inject('IRefreshTokenRepository')
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  createRefreshToken = async (data: CreateRefreshTokenDto) => {
    const token_hash = hashToken(data.refreshToken);

    await this.refreshTokenRepository.create({
      token_hash,
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
      user_id: payLoad.user_id,
      ip: reqContext.ip,
      user_agent: reqContext.user_agent,
      jti,
    });

    return { accessToken, refreshToken };
  };

  rotateRefreshToken = async (
    tokenHash: string,
    payLoad: any,
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    await this.deleteRefreshTokenByTokenHash(tokenHash);

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

  verifyRefreshToken = async (token: string): Promise<{ doc: RefreshToken; decoded: any }> => {
    let decoded: any;
    const tokenHash = hashToken(token);

    try {
      decoded = jwt.verify(token, env.REFRESH_SECRET);
    } catch {
      await this.deleteRefreshTokenByTokenHash(tokenHash);
      throw new ApiError('Invalid or expired refresh token', httpStatus.NOT_FOUND);
    }

    const doc = await this.findRefreshTokenByTokenHashAndJti(tokenHash, decoded.jti);

    if (!doc) {
      throw new ApiError('Refresh token not recognized', httpStatus.NOT_FOUND);
    }

    // return { ...doc, tenant_id: decoded.tenant_id, gym_id: decoded.gym_id };
    return { doc, decoded };
  };
}

export default TokenService;
