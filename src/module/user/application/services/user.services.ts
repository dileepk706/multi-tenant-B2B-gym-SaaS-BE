import { CreateUserDto } from '@/module/user/application/dtos/create-user.dto.js';
import User, { UserPartial } from '@/module/user/domain/entites/user.entity.js';
import IUserRepository from '@/module/user/domain/interfaces/user.repository.inteface.js';
import { ApiError } from '@/shared/middleware/error_handler.js';
import { comparePassword, hashPassword } from '@/utils/hash.util.js';
import { inject, injectable } from 'tsyringe';
import httpStatus from 'http-status';
import IUserService from '@/module/user/domain/interfaces/user.services.interface.js';
import { LoginUserDto } from '@/module/user/application/dtos/login-user.dto.js';
import { QueryExecutor } from '@/shared/types/database.js';

@injectable()
class UserService implements IUserService {
  constructor(@inject('IUserRepository') private readonly userRepository: IUserRepository) {}

  create = async (user: CreateUserDto, client?: QueryExecutor): Promise<User> => {
    const existingUser = await this.userRepository.findByEmail(user.email, client);
    if (existingUser)
      throw new ApiError('User with same email already exists', httpStatus.CONFLICT);
    const hashedPassword = await hashPassword(user.password);
    return this.userRepository.create({ ...user, password: hashedPassword }, client);
  };

  findByEmail = async (email: string, client?: QueryExecutor): Promise<User | null> => {
    return this.userRepository.findByEmail(email, client);
  };

  validate = async (user: LoginUserDto, client?: QueryExecutor): Promise<User> => {
    const registerdUser = await this.findByEmail(user.email, client);
    if (!registerdUser) throw new ApiError('Invalid credentials', httpStatus.UNAUTHORIZED);
    const isPasswordValid = await comparePassword(user.password, registerdUser.password);
    if (!isPasswordValid) throw new ApiError('Invalid credentials', httpStatus.UNAUTHORIZED);
    return registerdUser;
  };

  updateById = async (id: string, user: UserPartial, client?: QueryExecutor): Promise<User> => {
    const res = await this.userRepository.updateById(id, user, client);
    return res;
  };
}

export default UserService;
