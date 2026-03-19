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
  pgm.createTable('roles', {
    id: {
      type: 'uuid',
      default: pgm.func('gen_random_uuid()'),
      primaryKey: true,
    },
    name: {
      type: 'varchar(255)',
      notNull: true,
      unique: true,
    },
    ...commonColumns(pgm),
  });

  pgm.sql(`
    INSERT INTO roles (name) VALUES 
    ('owner'), 
    ('manager'), 
    ('trainer');
  `);

  addTimestampTrigger(pgm, 'roles');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
