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
  pgm.createTable('staff', {
    id: {
      type: 'uuid',
      default: pgm.func('gen_random_uuid()'),
      primaryKey: true,
    },
    tenant_id: {
      type: 'uuid',
      notNull: true,
      references: 'tenants(id)',
    },
    gym_id: {
      type: 'uuid',
      notNull: true,
      references: 'gyms(id)',
    },
    user_id: {
      type: 'uuid',
      notNull: true,
      references: 'users(id)',
    },
    role_id: {
      type: 'uuid',
      notNull: true,
      references: 'roles(id)',
    },
    name: {
      type: 'varchar(255)',
      notNull: true,
    },
    email: {
      type: 'varchar(255)',
      notNull: true,
    },
    phone: {
      type: 'varchar(255)',
      notNull: true,
    },

    ...commonColumns(pgm),
  });

  addTimestampTrigger(pgm, 'staff');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
