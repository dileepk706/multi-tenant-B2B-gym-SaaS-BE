import { Pool } from 'pg';
import { inject, injectable } from 'tsyringe';

@injectable()
class DbSharedService {
  constructor(@inject(Pool) private readonly pool: Pool) {}

  getClient = async () => {
    return await this.pool.connect();
  };
}

export default DbSharedService;
