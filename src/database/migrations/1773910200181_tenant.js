import { commonColumns, addTimestampTrigger } from '../migration-utils.js';
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('tenants', {
    id: {
      type: 'uuid',
      default: pgm.func('gen_random_uuid()'),
      primaryKey: true,
    },
    name: {
      type: 'varchar(255)',
      notNull: true,
    },
    primary_gym_id: {
      type: 'uuid',
    },
    ...commonColumns(pgm),
  });

  addTimestampTrigger(pgm, 'tenants');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
