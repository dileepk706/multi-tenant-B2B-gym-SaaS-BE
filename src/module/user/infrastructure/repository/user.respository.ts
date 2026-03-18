import IUserRepository from '@/module/user/domain/interfaces/user.repository.inteface.js';
import UserEntity from '@/module/user/domain/entites/user.entity.js';
import { CreateUserDto } from '@/module/user/application/dtos/create-user.dto.js';
import { inject, injectable } from 'tsyringe';
import { Pool } from 'pg';

@injectable()
class UserRepository implements IUserRepository {
  constructor(@inject(Pool) private readonly pool: Pool) {}

  create = async (user: CreateUserDto): Promise<UserEntity> => {
    const result = await this.pool.query(
      `INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *`,
      [user.email, user.password],
    );
    return result.rows[0];
  };

  findAll = async (): Promise<UserEntity[]> => {
    const result = await this.pool.query(`SELECT * FROM users`);
    return result.rows;
  };

  findByEmail = async (email: string): Promise<UserEntity | null> => {
    const result = await this.pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
    return result.rows[0] || null;
  };
}

export default UserRepository;
