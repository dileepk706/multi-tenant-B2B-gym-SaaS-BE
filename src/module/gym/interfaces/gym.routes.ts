import { Router } from 'express';
import { container } from '@/config/container.js';
import GymController from '@/module/gym/interfaces/gym.controller.js';
import type { ModuleRouteConfig } from '@/routes/route.types.js';
import asyncHandler from '@/shared/middleware/async_handler.js';

const gymRouter: Router = Router();

const getController = () => container.resolve<GymController>('IGymController');

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
gymRouter.get('/:id', (req, res) => getController().getGymById(req, res));

/**
 * @swagger
 * /api/gym:
 *   get:
 *     summary: Get all users
 *     tags: [Gym]
 *     responses:
 *       200:
 *         description: Users fetched successfully
 */
gymRouter.get('/', asyncHandler(getController().getAllGyms));

export const gymRouteConfig: ModuleRouteConfig = {
  basePath: '/gym',
  router: gymRouter,
  group: 'protected',
};

export default gymRouter;
