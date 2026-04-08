import { Router } from 'express';
import { container } from '@/config/container.js';
import type { ModuleRouteConfig } from '@/routes/route.types.js';
import IStaffFcade from '@/module/staff/domain/interfaces/staff.controller.interface.js';
import asyncHandler from '@/shared/middleware/async_handler.js';
import { processRequestBody } from '@/shared/middleware/validation.js';
import { createStaffSchema } from '@/module/staff/application/dtos/create-staff-dto.js';

const staffRoutes = Router();

const getController = () => container.resolve<IStaffFcade>('IStaffController');

/**
 * @swagger
 * /api/staff:
 *   post:
 *     summary: Create a new staff member
 *     tags:
 *       - Staff
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               role_id:
 *                 type: string
 *               check_in_code:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Staff member created successfully
 *
 */
staffRoutes.post(
  '/',
  processRequestBody(createStaffSchema),
  asyncHandler(getController().createStaffUser),
);

export const staffRouteConfig: ModuleRouteConfig = {
  basePath: '/staff',
  router: staffRoutes,
  group: 'protected',
};
