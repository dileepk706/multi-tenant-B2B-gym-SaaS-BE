import { Router } from 'express';
import { container } from '@/config/container.js';
import type { ModuleRouteConfig } from '@/routes/route.types.js';
import asyncHandler from '@/shared/middleware/async_handler.js';
import IRoleController from '@/module/role/domain/interfaces/role.controller.interface.js';

const roleRouter = Router();

const getController = () => container.resolve<IRoleController>('IRoleController');

/**
 * @swagger
 * tags:
 *   name: Role
 *   description: Role management
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all staff roles (excluding owner)
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Staff roles fetched successfully
 *       401:
 *         description: Unauthorized
 */

roleRouter.get(
  '/',
  asyncHandler((req, res) => getController().getAllStaffRoles(req, res)),
);

export const roleRouteConfig: ModuleRouteConfig = {
  basePath: '/roles',
  router: roleRouter,
  group: 'protected',
};

export default roleRouter;
