import { Router } from 'express';
//
import { container } from '@/config/container.js';
import IUserController from '@/module/user/domain/interfaces/user.controller.interface.js';
import asyncHandler from '@/shared/middleware/async_handler.js';
import { createUserSchema } from '@/module/user/application/dtos/create-user.dto.js';
import { processRequestBody } from '@/shared/middleware/validation.js';
import type { ModuleRouteConfig } from '@/routes/route.types.js';
import { loginUserSchema } from '@/module/user/application/dtos/login-user.dto.js';
import IUserAuthController from '@/module/user/domain/interfaces/user.auth.controller.interface.js';

const userRouter = Router();

const getController = () => container.resolve<IUserController>('IUserController');
const getAuthController = () => container.resolve<IUserAuthController>('IUserAuthController');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Create a new user account
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 */
userRouter.post(
  '/register',
  processRequestBody(createUserSchema),
  asyncHandler(getController().createUser),
);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Validation error
 */

userRouter.post(
  '/login',
  processRequestBody(loginUserSchema),
  asyncHandler(getAuthController().login),
);

/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: Logout
 *     tags: [User]
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
 *         description: Logged out successfully
 *       400:
 *         description: Validation error
 */
userRouter.post('/logout', asyncHandler(getAuthController().logout));

export const userRouteConfig: ModuleRouteConfig = {
  basePath: '/user',
  router: userRouter,
  group: 'public',
};

export default userRouter;
