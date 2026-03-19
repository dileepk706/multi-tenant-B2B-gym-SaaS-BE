import type { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import env from '@/config/environment.js';
import { logger } from '@/shared/logger.js';
import { ApiError } from '@/shared/middleware/error_handler.js';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: 'Authentication required. Please provide a valid token.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.ACCESS_SECRET) as any;
    req.user = decoded;
    next();
  } catch (err: any) {
    logger.error(err);
    if (err.name === 'TokenExpiredError') {
      throw new ApiError('Access token expired', httpStatus.UNAUTHORIZED);
    }
    throw new ApiError('Invalid token.', httpStatus.UNAUTHORIZED);
  }
};

/**
 * Admin authorization middleware — must be applied AFTER `authenticate`.
 *
 * Checks that the authenticated user has admin-level privileges.
 *
 * TODO: Implement real role checking once the user model supports roles.
 */
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
  // if (req.user?.role !== 'admin') {
  //   res.status(httpStatus.FORBIDDEN).json({
  //     success: false,
  //     message: 'Admin access required.',
  //   });
  //   return;
  // }

  next();
};
