export type EnvType = {
  NODE_ENV?: string;
  LOG_LEVEL: string;
  PORT: number;
  IS_PRODUCTION: boolean;
  IS_DEVELOPMENT: boolean;
  IS_TEST: boolean;
  CORS_ORIGIN: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  ACCESS_SECRET: string;
  REFRESH_SECRET: string;
  ACCESS_TTL: string;
  REFRESH_TTL_SEC: number;
  DEFAULT_PASSWORD: string;
};

const isProduction = () => process.env.NODE_ENV === 'production';
const isDevelopment = () => process.env.NODE_ENV === 'development';

const env: EnvType = {
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: isProduction() ? 'info' : 'debug',
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  IS_PRODUCTION: isProduction(),
  IS_DEVELOPMENT: isDevelopment(),
  IS_TEST: false,
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  DB_NAME: process.env.DB_NAME || 'gym_saas',
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
  ACCESS_SECRET: process.env.ACCESS_SECRET || 'access_secret',
  REFRESH_SECRET: process.env.REFRESH_SECRET || 'refresh_secret',
  // ACCESS_TTL: process.env.ACCESS_TTL || '15m',
  // REFRESH_TTL_SEC: process.env.REFRESH_TTL_SEC
  //   ? parseInt(process.env.REFRESH_TTL_SEC, 10)
  //   : 60 * 60 * 24 * 7, // 7 days
  REFRESH_TTL_SEC: 1 * 60, // 7 days
  ACCESS_TTL: '5s',
  DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD || '123',
};

export default env;
