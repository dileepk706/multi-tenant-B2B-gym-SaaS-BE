import { DependencyContainer } from 'tsyringe';
import TokenService from '@/module/token/application/services/token.service.js';
import RefreshTokenRepository from '@/module/token/infra/repo/refresh-tokens.repo.js';
import TokenController from '@/module/token/interfaces/token.controller.js';

const registerTokenModule = (container: DependencyContainer) => {
  container.registerSingleton('ITokenService', TokenService);
  container.registerSingleton('IRefreshTokenRepository', RefreshTokenRepository);
  container.registerSingleton('ITokenController', TokenController);
};

export default registerTokenModule;
