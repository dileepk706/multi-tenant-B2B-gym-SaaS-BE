import { Pool, PoolClient } from 'pg';

export type QueryExecutor = Pool | PoolClient;
