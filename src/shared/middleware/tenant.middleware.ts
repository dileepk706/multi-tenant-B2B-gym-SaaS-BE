import type { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { ApiError } from '@/shared/middleware/error_handler.js';

const tenantMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const tenantId = req.user?.tenant_id;
  const gymId = req.user?.gym_id;
  if (!tenantId || !gymId)
    throw new ApiError('Tenant ID and Gym ID are required.', httpStatus.UNAUTHORIZED);
  next();
};

export default tenantMiddleware;
