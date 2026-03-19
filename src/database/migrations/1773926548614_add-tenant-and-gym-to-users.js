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
  pgm.sql('DELETE FROM users CASCADE;');
  pgm.addColumns('users', {
    tenant_id: {
      type: 'uuid',
      references: 'tenants(id)',
    },
    gym_id: {
      type: 'uuid',
      references: 'gyms(id)',
    },
    name: {
      type: 'varchar(255)',
      notNull: true,
      unique: true,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropColumns('users', ['tenant_id', 'gym_id']);
};
