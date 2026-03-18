import { CreateUserDto } from '@/module/user/application/dtos/create-user.dto.js';
import UserEntity from '@/module/user/domain/entites/user.entity.js';

export default interface IUserRepository {
  create(user: CreateUserDto): Promise<UserEntity>;
  findByEmail: (email: string) => Promise<UserEntity | null>;
}
