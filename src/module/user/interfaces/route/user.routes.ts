import { Router } from 'express';
//
import { container } from '@/config/container.js';
import IUserController from '@/module/user/domain/interfaces/user.controller.interface.js';
import asyncHandler from '@/shared/middleware/async_handler.js';
import type { ModuleRouteConfig } from '@/routes/route.types.js';

const userRouter = Router();

const getController = () => container.resolve<IUserController>('IUserController');

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get current user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       404:
 *         description: User not found
 */
userRouter.get('/profile', asyncHandler(getController().findOne));

export const userRouteConfig: ModuleRouteConfig = {
  basePath: '/user',
  router: userRouter,
  group: 'protected',
};

export default userRouter;
