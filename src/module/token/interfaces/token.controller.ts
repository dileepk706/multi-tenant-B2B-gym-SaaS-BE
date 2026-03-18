import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import httpStatus from 'http-status';
//
import { ApiError } from '@/shared/middleware/error_handler.js';
import TokenService from '@/module/token/application/services/token.service.js';
import { cookieHandler, responseHandler } from '@/shared/response_handler.js';

@injectable()
class TokenController {
  constructor(@inject('ITokenService') private readonly tokenService: TokenService) {}

  refreshToken = async (req: Request, res: Response) => {
    const token = req.cookies?.refresh_token || req.body.refresh_token;
    if (!token) throw new ApiError('No refresh token', httpStatus.UNAUTHORIZED);

    const doc = await this.tokenService.verifyRefreshToken(token);

    const result = await this.tokenService.rotateRefreshToken(doc.id, {
      user_id: doc.user_id,
      ip: req.ip || '',
      user_agent: req.get('User-Agent') || '',
    });

    cookieHandler(res, { refreshToken: result.refreshToken }, 'refresh_token');

    return responseHandler(
      res,
      { accessToken: result.accessToken },
      'Token refreshed successfully',
      httpStatus.OK,
    );
  };
}

export default TokenController;
