import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import httpStatus from 'http-status';
//
import { ApiError } from '@/shared/middleware/error_handler.js';
import { cookieHandler, sendSuccess } from '@/shared/response_handler.js';
import IRefreshTokenController from '@/module/token/domain/intefaces/refresh-token.controller.interface.js';
import IRefreshTokenService from '@/module/token/domain/intefaces/refresh-token.service.interface.js';

@injectable()
class TokenController implements IRefreshTokenController {
  constructor(@inject('ITokenService') private readonly tokenService: IRefreshTokenService) {}

  refreshToken = async (req: Request, res: Response): Promise<any> => {
    const token = req.cookies?.refresh_token;
    if (!token) throw new ApiError('No refresh token', httpStatus.UNAUTHORIZED);

    const { doc, decoded } = await this.tokenService.verifyRefreshToken(token);

    const result = await this.tokenService.rotateRefreshToken(doc.token_hash, {
      user_id: doc.user_id,
      ip: req.ip || '',
      user_agent: req.get('User-Agent') || '',
      ...decoded,
    });

    cookieHandler(res, { refreshToken: result.refreshToken }, 'refresh_token');

    return sendSuccess(
      res,
      { accessToken: result.accessToken },
      'Token refreshed successfully',
      httpStatus.OK,
    );
  };
}

export default TokenController;
