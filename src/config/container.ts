import { container } from 'tsyringe';
import { Pool } from 'pg';
//
import registerGymModule from '@/module/gym/gym.container.js';
import registerUserModule from '@/module/user/user.container.js';
import pool from '@/database/connection.js';
import registerAuthModule from '@/module/token/token.container.js';

const registerDependencies = () => {
  container.registerInstance(Pool, pool);
  registerGymModule(container);
  registerUserModule(container);
  registerAuthModule(container);
};

export default registerDependencies;
export { container };
