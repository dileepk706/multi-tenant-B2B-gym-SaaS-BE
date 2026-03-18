import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
//
import { cookieHandler, responseHandler } from '@/shared/response_handler.js';
import IUserAuthController from '@/module/user/domain/interfaces/user.auth.controller.interface.js';
import TokenService from '@/module/token/application/services/token.service.js';
import IUserService from '@/module/user/domain/interfaces/user.services.interface.js';
import { hashToken } from '@/shared/services/token.shared.service.js';

@injectable()
class UserAuthController implements IUserAuthController {
  constructor(
    @inject('ITokenService') private readonly tokenService: TokenService,
    @inject('IUserService') private readonly userService: IUserService,
  ) {}

  login = async (req: Request, res: Response) => {
    const result = await this.userService.validateUser(req.body);

    const payLoad = {
      id: result.id,
      email: result.email,
    };

    const { accessToken, refreshToken } = await this.tokenService.generateAuthTokens(payLoad, {
      ip: req.ip || '',
      user_agent: req.get('User-Agent') || '',
    });

    cookieHandler(res, { refreshToken }, 'refresh_token');

    return responseHandler(
      res,
      { accessToken, refreshToken },
      'User logged in successfully',
      httpStatus.OK,
    );
  };

  logout = async (req: Request, res: Response) => {
    const token = req.cookies?.refresh_token || req.body.refresh_token;
    this.tokenService.deleteRefreshTokenByTokenHash(hashToken(token));
    res.clearCookie('refresh_token');
    return responseHandler(res, {}, 'Logged out successfully', httpStatus.OK);
  };
}

export default UserAuthController;
