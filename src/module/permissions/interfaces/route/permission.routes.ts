import { Router } from 'express';
import { container } from '@/config/container.js';
import type { ModuleRouteConfig } from '@/routes/route.types.js';
import asyncHandler from '@/shared/middleware/async_handler.js';
import IPermissionController from '@/module/permissions/domain/interfaces/permission.controller.interface.js';

const permissionRouter = Router();

const getController = () => container.resolve<IPermissionController>('IPermissionController');

/**
 * @swagger
 * tags:
 *   name: Permission
 *   description: Permission management
 */

/**
 * @swagger
 * /api/permissions:
 *   get:
 *     summary: Get all permissions
 *     tags: [Permission]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Permissions fetched successfully
 *       401:
 *         description: Unauthorized
 */

permissionRouter.get('/', asyncHandler(getController().getAllPermissions));

export const permissionRouteConfig: ModuleRouteConfig = {
  basePath: '/permissions',
  router: permissionRouter,
  group: 'protected',
};

export default permissionRouter;
