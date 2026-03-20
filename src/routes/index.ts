import { Router } from 'express';
import { logger } from '@/shared/logger.js';
import { authenticate } from '@/shared/middleware/auth.middleware.js';
import type { ModuleRouteConfig, RouteGroupMiddleware } from '@/routes/route.types.js';

import { gymRouteConfig } from '@/module/gym/interfaces/gym.routes.js';
import { userRouteConfig } from '@/module/user/interfaces/route/user.routes.js';
import { tokenRouteConfig } from '@/module/token/interfaces/token.routes.js';
import { onboardingRouteConfig } from '@/module/onboarding/interfaces/onboarding.routes.js';
import tenantMiddleware from '@/shared/middleware/tenant.middleware.js';

const moduleRoutes: ModuleRouteConfig[] = [
  gymRouteConfig,
  userRouteConfig,
  tokenRouteConfig,
  onboardingRouteConfig,
];

const groupMiddleware: RouteGroupMiddleware = {
  public: [],
  protected: [authenticate, tenantMiddleware],
  // admin: [authenticate, authorizeAdmin],
  admin: [authenticate],
};

const API_PREFIX = '/api';

export function registerRoutes(): Router {
  const rootRouter = Router();

  for (const { basePath, router, group } of moduleRoutes) {
    const fullPath = `${API_PREFIX}${basePath}`;
    const middleware = groupMiddleware[group];

    rootRouter.use(fullPath, ...middleware, router);

    logger.info(`Registered routes: ${fullPath}  [${group}]`);
  }

  return rootRouter;
}
