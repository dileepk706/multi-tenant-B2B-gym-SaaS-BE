import { Pool } from 'pg';
import { inject, injectable } from 'tsyringe';
import RefreshTokenEntity from '@/module/token/domain/refresh-token.entity.js';

@injectable()
class RefreshTokenRepository {
  constructor(@inject(Pool) private readonly pool: Pool) {}

  create = async (token: any) => {
    const result = await this.pool.query(
      `INSERT INTO refresh_tokens (token_hash,jti,user_id,expires_at,ip,user_agent) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [token.token_hash, token.jti, token.user_id, token.expires_at, token.ip, token.user_agent],
    );
    return result.rows[0];
  };

  findByTokenHashAndJti = async (tokenHash: string, jti: string): Promise<RefreshTokenEntity> => {
    const result = await this.pool.query(
      'SELECT * FROM refresh_tokens where token_hash=$1 and jti=$2',
      [tokenHash, jti],
    );
    return result.rows[0];
  };

  findByTokenHash = async (tokenHash: string): Promise<RefreshTokenEntity> => {
    const result = await this.pool.query('SELECT * FROM refresh_tokens where token_hash=$1', [
      tokenHash,
    ]);
    return result.rows[0];
  };

  update = async (id: string, data: any): Promise<RefreshTokenEntity> => {
    const result = await this.pool.query(
      'UPDATE refresh_tokens SET revoked_at=$1,jti=$2 where id=$3 RETURNING *',
      [data.revoked_at, data.jti, id],
    );
    return result.rows[0];
  };

  deleteByTokenHash = async (tokenHash: string): Promise<RefreshTokenEntity> => {
    const result = await this.pool.query(
      'DELETE FROM refresh_tokens WHERE token_hash=$1 RETURNING *',
      [tokenHash],
    );
    return result.rows[0];
  };

  deleteById = async (id: string): Promise<RefreshTokenEntity> => {
    const result = await this.pool.query('DELETE FROM refresh_tokens WHERE id=$1 RETURNING *', [
      id,
    ]);
    return result.rows[0];
  };
}

export default RefreshTokenRepository;
