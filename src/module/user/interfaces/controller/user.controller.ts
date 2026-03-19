import IUserController from '@/module/user/domain/interfaces/user.controller.interface.js';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import IUserService from '@/module/user/domain/interfaces/user.services.interface.js';
import { responseHandler } from '@/shared/response_handler.js';

@injectable()
class UserController implements IUserController {
  constructor(@inject('IUserService') private readonly userService: IUserService) {}

  createUser = async (req: Request, res: Response) => {
    const result = await this.userService.create(req.body);
    return responseHandler(res, result, 'User created successfully', 201);
  };
}

export default UserController;
