import { CreateUserDto } from '@/module/user/application/dtos/create-user.dto.js';
import UserEntity from '@/module/user/domain/entites/user.entity.js';
import IUserRepository from '@/module/user/domain/interfaces/user.repository.inteface.js';
import { ApiError } from '@/shared/middleware/error_handler.js';
import { comparePassword, hashPassword } from '@/utils/hash.util.js';
import { inject, injectable } from 'tsyringe';
import httpStatus from 'http-status';
import IUserService from '@/module/user/domain/interfaces/user.services.interface.js';
import { LoginUserDto } from '@/module/user/application/dtos/login-user.dto.js';

@injectable()
class UserService implements IUserService {
  constructor(@inject('IUserRepository') private readonly userRepository: IUserRepository) {}

  createUser = async (user: CreateUserDto): Promise<UserEntity> => {
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser)
      throw new ApiError('User with same email already exists', httpStatus.CONFLICT);
    const hashedPassword = await hashPassword(user.password);
    return this.userRepository.create({ ...user, password: hashedPassword });
  };

  findUserByEmail = async (email: string): Promise<UserEntity | null> => {
    return this.userRepository.findByEmail(email);
  };

  validateUser = async (user: LoginUserDto): Promise<UserEntity> => {
    const registerdUser = await this.findUserByEmail(user.email);
    if (!registerdUser) throw new ApiError('Invalid credentials', httpStatus.UNAUTHORIZED);
    const isPasswordValid = await comparePassword(user.password, registerdUser.password);
    if (!isPasswordValid) throw new ApiError('Invalid credentials', httpStatus.UNAUTHORIZED);
    return registerdUser;
  };
}

export default UserService;
