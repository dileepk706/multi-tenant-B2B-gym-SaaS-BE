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
  pgm.createTable('gyms', {
    id: {
      type: 'uuid',
      default: pgm.func('gen_random_uuid()'),
      primaryKey: true,
    },
    name: {
      type: 'varchar(255)',
      notNull: true,
    },
    tenant_id: {
      type: 'uuid',
      notNull: true,
      references: 'tenants(id)',
    },
    address: {
      type: 'varchar(255)',
    },
    city: {
      type: 'varchar(255)',
      notNull: true,
    },
    state: {
      type: 'varchar(255)',
      notNull: true,
    },
    phone: {
      type: 'varchar(255)',
    },
    email: {
      type: 'varchar(255)',
    },
    logo_url: {
      type: 'varchar(255)',
    },

    ...commonColumns(pgm),
  });

  addTimestampTrigger(pgm, 'gyms');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
