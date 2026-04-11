import { Router } from 'express';
//
import { container } from '@/config/container.js';
import type { ModuleRouteConfig } from '@/routes/route.types.js';
import IOnboardingController from '@/module/onboarding/domain/onboarding.controller.interface.js';
import asyncHandler from '@/shared/middleware/async_handler.js';
import { processRequestBody } from '@/shared/middleware/validation.js';
import { createWorkspaceSchema } from '@/module/onboarding/application/dtos/create-workspace.dto.js';

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
 *               - gym_url
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               gym_url:
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
  processRequestBody(createWorkspaceSchema),
  asyncHandler(getController().createWorkspaceAndOnboardOwner),
);

/**
 * @swagger
 * /api/onboarding/check-gym-url:
 *   get:
 *     summary: Check if a gym URL is available
 *     tags: [Onboarding]
 *     parameters:
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *         required: true
 *         description: The gym URL to check
 *     responses:
 *       200:
 *         description: Gym URL availability status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     available:
 *                       type: boolean
 *       400:
 *         description: Bad request (missing URL parameter)
 */
onboardingRouter.get(
  '/check-gym-url',
  asyncHandler((req, res) => getController().checkGymUrl(req, res)),
);

export const onboardingRouteConfig: ModuleRouteConfig = {
  basePath: '/onboarding',
  router: onboardingRouter,
  group: 'admin',
};

export default onboardingRouter;
