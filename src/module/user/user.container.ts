import UserController from '@/module/user/interfaces/controller/user.controller.js';
import { DependencyContainer } from 'tsyringe';
import UserRepository from '@/module/user/infrastructure/repository/user.respository.js';
import UserService from '@/module/user/application/services/user.services.js';
import UserAuthController from '@/module/user/interfaces/controller/user.auth.controller.js';

export default function registerUserModule(container: DependencyContainer) {
  container.registerSingleton('IUserController', UserController);
  container.registerSingleton('IUserRepository', UserRepository);
  container.registerSingleton('IUserService', UserService);
  container.registerSingleton('IUserAuthController', UserAuthController);
}
