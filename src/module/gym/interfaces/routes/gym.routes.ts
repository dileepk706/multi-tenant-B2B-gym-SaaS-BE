import { Router } from 'express';
import { container } from '@/config/container.js';
import type { ModuleRouteConfig } from '@/routes/route.types.js';
import asyncHandler from '@/shared/middleware/async_handler.js';
import IGymController from '@/module/gym/domain/interfaces/gym.controller.interface.js';
import { processRequestBody } from '@/shared/middleware/validation.js';
import { createGymDtoSchema } from '@/module/gym/application/dtos/create-gym.dtos.js';

const gymRouter: Router = Router();

const getController = () => container.resolve<IGymController>('IGymController');

/**
 * @swagger
 * tags:
 *   name: Gym
 *   description: Gym management
 */

/**
 * @swagger
 * /api/gym/{id}:
 *   get:
 *     summary: Retrieve a gym by ID
 *     tags: [Gym]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the gym
 *     responses:
 *       200:
 *         description: Gym details
 *       404:
 *         description: Gym not found
 *       401:
 *         description: Unauthorized
 */
gymRouter.get('/:id', (req, res) => getController().findById(req, res));

/**
 * @swagger
 * /api/gym:
 *   post:
 *     summary: Create a new gym
 *     tags: [Gym]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               gym_url: { type: string }
 *               phone: { type: string }
 *               address: { type: string }
 *               city: { type: string }
 *               state: { type: string }
 *               logo_url: { type: string }
 *             required:
 *               - name
 *               - email
 *               - gym_url
 *     responses:
 *       201:
 *         description: Gym created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
gymRouter.post('/', processRequestBody(createGymDtoSchema), asyncHandler(getController().create));

/**
 * @swagger
 * /api/gym/{id}:
 *   put:
 *     summary: Update a gym by ID
 *     tags: [Gym]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the gym
 *     responses:
 *       200:
 *         description: Gym updated successfully
 *       404:
 *         description: Gym not found
 *       401:
 *         description: Unauthorized
 */
gymRouter.put('/:id', asyncHandler(getController().updateById));

/**
 * @swagger
 * /api/gym:
 *   get:
 *     summary: Retrieve a list of gyms
 *     tags: [Gym]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of gyms
 *       401:
 *         description: Unauthorized
 */
gymRouter.get('/', asyncHandler(getController().getGyms));

export const gymRouteConfig: ModuleRouteConfig = {
  basePath: '/gyms',
  router: gymRouter,
  group: 'protected',
};

export default gymRouter;
