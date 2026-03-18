import env from '@/config/environment.js';
import { logger } from '@/shared/logger.js';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export interface AppError extends Error {
  statusCode: number;
  isOperational: boolean;
}

export class ApiError extends Error implements AppError {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = httpStatus.INTERNAL_SERVER_ERROR,
    isOperational: boolean = true,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction): void => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message = 'Internal Server Error';

  if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.message) {
    message = err.message;
  }

  // logger.error('Validation error:', req.originalUrl, {
  //   error: {
  //     message,
  //     stack: err.stack,
  //     statusCode,
  //     name: err.name,
  //     ...(err.constructor?.name && { type: err.constructor.name }),
  //   },
  //   request: {
  //     method: req.method,
  //     url: req.originalUrl,
  //     ip: req.ip,
  //     userAgent: req.get('User-Agent'),
  //   },
  // });

  logger.error(err);

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
      ...(env.NODE_ENV === 'development' && { stack: err.stack }),
    },
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  });
};
