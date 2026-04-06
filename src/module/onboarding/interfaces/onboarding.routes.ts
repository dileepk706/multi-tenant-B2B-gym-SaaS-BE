import { Router } from 'express';
//
import { container } from '@/config/container.js';
import type { ModuleRouteConfig } from '@/routes/route.types.js';
import IOnboardingController from '@/module/onboarding/domain/onboarding.controller.interface.js';
import asyncHandler from '@/shared/middleware/async_handler.js';
import { processRequestBody } from '@/shared/middleware/validation.js';
import { createGymSchema } from '@/module/gym/application/dtos/create-gym.dtos.js';

const onboardingRouter = Router();

const getController = () => container.resolve<IOnboardingController>('IOnboardingController');

/**
 * @swagger
 * tags:
 *   name: Onboarding
 *   description: Onboarding
 */

/**
 * @swagger
 * /api/onboarding/create-workspace:
 *   post:
 *     summary: Create a new workspace and onboard owner
 *     tags: [Onboarding]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - city
 *               - state
 *               - phone
 *               - address
 *               - logo_url
 *
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               logo_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Workspace created successfully
 *       400:
 *         description: Validation error
 */

onboardingRouter.post(
  '/create-workspace',
  processRequestBody(createGymSchema),
  asyncHandler(getController().createWorkspaceAndOnboardOwner),
);

export const onboardingRouteConfig: ModuleRouteConfig = {
  basePath: '/onboarding',
  router: onboardingRouter,
  group: 'admin',
};

export default onboardingRouter;
