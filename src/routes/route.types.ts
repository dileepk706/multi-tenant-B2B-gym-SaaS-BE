import type { Router, RequestHandler } from 'express';

export interface ModuleRouteConfig {
  basePath: string;
  router: Router;
  group: RouteGroup;
}

export type RouteGroup = 'public' | 'protected' | 'admin';

export type RouteGroupMiddleware = Record<RouteGroup, RequestHandler[]>;
