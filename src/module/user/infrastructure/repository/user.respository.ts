import IUserRepository from '@/module/user/domain/interfaces/user.repository.inteface.js';
import User from '@/module/user/domain/entites/user.entity.js';
import { CreateUserDto } from '@/module/user/application/dtos/create-user.dto.js';
import { inject, injectable } from 'tsyringe';
import { Pool } from 'pg';
import { QueryExecutor } from '@/shared/types/database.js';

@injectable()
class UserRepository implements IUserRepository {
  constructor(@inject(Pool) private readonly pool: Pool) {}

  create = async (user: CreateUserDto, client?: QueryExecutor): Promise<User> => {
    const exec = client || this.pool;
    const result = await exec.query(
      `INSERT INTO users (email,password,name) VALUES ($1,$2,$3) RETURNING *`,
      [user.email, user.password, user.name],
    );
    return result.rows[0];
  };

  findAll = async (client?: QueryExecutor): Promise<User[]> => {
    const exec = client || this.pool;
    const result = await exec.query(`SELECT * FROM users`);
    return result.rows;
  };

  findByEmail = async (email: string, client?: QueryExecutor): Promise<User | null> => {
    const exec = client || this.pool;
    const result = await exec.query(`SELECT * FROM users WHERE email=$1`, [email]);
    return result.rows[0] || null;
  };

  updateById = async (
    id: string,
    user: Partial<CreateUserDto>,
    client?: QueryExecutor,
  ): Promise<User> => {
    const keys = Object.keys(user);
    const values = Object.values(user);
    const query = `UPDATE users SET ${keys.map((key, index) => `${key}=$${index + 1}`).join(',')} WHERE id=$${keys.length + 1} RETURNING *`;
    const exec = client || this.pool;
    const result = await exec.query(query, [...values, id]);
    return result.rows[0] || null;
  };
}

export default UserRepository;
