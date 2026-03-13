import env from '@/config/environment.js';
import { Pool } from 'pg';

const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
});

pool.on('connect', () => {
  console.log('PostgreSQL connected');
});

export default pool;
