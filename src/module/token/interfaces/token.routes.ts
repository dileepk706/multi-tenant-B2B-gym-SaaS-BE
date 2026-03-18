import { Router } from 'express';
import { container } from '@/config/container.js';
import { ModuleRouteConfig } from '@/routes/route.types.js';
import asyncHandler from '@/shared/middleware/async_handler.js';

const tokenController = () => container.resolve<any>('ITokenController');

const tokenRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Token
 *   description: Token
 */

/**
 * @swagger
 * /api/refresh-token/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refresh_token
 *             properties:
 *               refresh_token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       400:
 *         description: Validation error
 */
tokenRoute.post('/refresh', asyncHandler(tokenController().refreshToken));

export const tokenRouteConfig: ModuleRouteConfig = {
  basePath: '/refresh-token',
  router: tokenRoute,
  group: 'public',
};

export default tokenRoute;
