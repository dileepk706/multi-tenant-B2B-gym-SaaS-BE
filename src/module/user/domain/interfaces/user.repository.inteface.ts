import { CreateUserDto } from '@/module/user/application/dtos/create-user.dto.js';
import User from '@/module/user/domain/entites/user.entity.js';
import { QueryExecutor } from '@/shared/types/database.js';

export default interface IUserRepository {
  create(user: CreateUserDto, client?: QueryExecutor): Promise<User>;
  findByEmail: (email: string, client?: QueryExecutor) => Promise<User | null>;
  updateById: (id: string, user: Partial<CreateUserDto>, client?: QueryExecutor) => Promise<User>;
}
