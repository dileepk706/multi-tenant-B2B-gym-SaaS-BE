import { CreateUserDto } from '@/module/user/application/dtos/create-user.dto.js';
import UserEntity from '@/module/user/domain/entites/user.entity.js';

export default interface IUserService {
  createUser(user: CreateUserDto): Promise<UserEntity>;
  findUserByEmail: (email: string) => Promise<UserEntity | null>;
  validateUser: (user: { email: string; password: string }) => Promise<UserEntity>;
}
