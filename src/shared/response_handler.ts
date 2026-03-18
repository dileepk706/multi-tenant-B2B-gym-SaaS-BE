import env from '@/config/environment.js';
import { Response } from 'express';

export const responseHandler = (res: Response, data: any, message: string, statusCode: number) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const cookieHandler = (res: Response, data: any, cookieName: string) => {
  return res.cookie(cookieName, data.refreshToken, {
    httpOnly: true,
    secure: env.IS_PRODUCTION,
    sameSite: 'strict',
    path: '/api/auth/refresh',
    maxAge: env.REFRESH_TTL_SEC * 1000,
  });
};
